import Kafka from 'node-rdkafka';
import fs from 'fs';

// Confluent Kafka configuration file
export const KAFKA_CONFIG_FILE = 'client.properties';

// Variable to store details of the Kafka configurations (for Singleton pattern)
let kafkaConfig: {[key: string]: string};

/**
 * Method to get Kafka configurations
 * @returns Kafka configurations
 */
export function getKafkaConfig() {
  if (!kafkaConfig) {
    kafkaConfig = readConfig(KAFKA_CONFIG_FILE);
  }
  return kafkaConfig;
}

/**
 * Method to read a configuration file
 * @param fileName Name of the configuration file
 * @returns Configuration object
 */
export function readConfig(fileName: string) {
  const data = fs.readFileSync(fileName, 'utf8').toString().split('\n');
  return data.reduce((config: {[key: string]: string}, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      config[key] = value;
    }
    return config;
  }, {});
}

/**
 * Method to create a Kafka producer
 * @param config Kafka producer configuration
 * @param onDeliveryReport Method to be called when a message is delivered
 * @returns Promise that resolves to a Kafka producer
 */
export function createProducer(
  config: Kafka.ProducerGlobalConfig,
  onDeliveryReport: (
    error: Kafka.LibrdKafkaError,
    report: Kafka.DeliveryReport
  ) => void
) {
  // Create a producer
  const producer = new Kafka.Producer(config);

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
 * Method to create a Kafka consumer
 * @param config Kafka consumer configuration
 * @param onData Method to be called when a message is received
 * @returns Promise that resolves to a Kafka consumer
 */
export function createConsumer(
  config: Kafka.ConsumerGlobalConfig,
  onData: (arg: Kafka.Message) => void
) {
  const consumer = new Kafka.KafkaConsumer(config, {
    'auto.offset.reset': 'earliest',
  });

  // Register listener for messages
  return new Promise((resolve) => {
    consumer.on('ready', () => resolve(consumer)).on('data', onData);

    consumer.connect();
  });
}
