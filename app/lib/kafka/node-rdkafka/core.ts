'use server';
import {
  ConsumerGlobalConfig,
  DeliveryReport,
  KafkaConsumer,
  LibrdKafkaError,
  Message,
  Producer,
  ProducerGlobalConfig,
} from 'node-rdkafka';
import {getKafkaConfig} from './config';
import {Logger} from '@/app/utils/logger/Logger';

// logger
const logger = new Logger({context: 'kafka-node-rdkafka'});

logger.debug('Kafka core called');

/*
 * Singleton to get global producer
 */
let producer: Producer;

/**
 * Method to create a Kafka producer
 * @param config Kafka producer configuration
 * @param onDeliveryReport Method to be called when a message is delivered
 * @returns Promise that resolves to a Kafka producer
 */
export async function createProducer(
  config: ProducerGlobalConfig,
  onDeliveryReport: (error: LibrdKafkaError, report: DeliveryReport) => void
): Promise<Producer> {
  logger.debug('Creating producer');
  // Create a producer
  const producer = new Producer(config);

  // Register listener for delivery reports from the producer
  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

/**
 * Type for the parameters of the getProducer method
 */
type GetProducerParams = {
  config?: ProducerGlobalConfig;
  onDeliveryReport?: (error: LibrdKafkaError, report: DeliveryReport) => void;
};

/**
 * Method to get a Kafka producer.
 * Returns the singleton producer if it exists, else creates a new producer.
 * Can optionally give the configurations or the onDeliveryReport method.
 * @param params Config and onDeliveryReport method
 * @returns Promise that resolves to a Kafka producer
 */
export async function getProducer({
  config,
  onDeliveryReport,
}: GetProducerParams = {}): Promise<Producer> {
  logger.debug('getProducer called');
  // If the global producer is not set, create a new producer
  if (!producer) {
    const onDelivery =
      onDeliveryReport ??
      ((err, report) => {
        if (err) {
          console.warn('Error producing', err);
        } else {
          const {topic, key, value} = report;
          console.log(
            `Produced event to topic ${topic}: key = ${key} value = ${value}`
          );
        }
      });

    // set the global producer
    producer = await createProducer(config ?? getKafkaConfig(), onDelivery);
  }
  // return the global producer
  return producer;
}

/**
 * Method to create a Kafka consumer
 * @param config Kafka consumer configuration
 * @param onData Method to be called when a message is received
 * @returns Promise that resolves to a Kafka consumer
 */
export async function createConsumer(
  config: ConsumerGlobalConfig,
  onData: (arg: Message) => void
) {
  logger.debug('Creating consumer');
  // Create a consumer
  const consumer = new KafkaConsumer(config, {
    'auto.offset.reset': 'earliest',
  });

  // Register listener for messages
  return new Promise((resolve) => {
    consumer.on('ready', () => resolve(consumer)).on('data', onData);

    consumer.connect();
  });
}
