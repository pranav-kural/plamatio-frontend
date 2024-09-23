'use server';
import {Consumer, EachMessageHandler, Kafka, Producer} from 'kafkajs';
import {Logger} from '@/app/utils/logger/Logger';

// logger
const logger = new Logger({context: 'kafka-core'});

let kafka: Kafka;
let producer: Producer;
let consumer: Consumer;
let producerConnected = false;
let consumerConnected = false;

function getKafkaClient() {
  logger.debug('getKafkaClient called');
  if (!kafka) {
    if (!process.env.BOOTSTRAP_SERVER) {
      throw new Error('BOOTSTRAP_SERVER is required');
    }
    if (!process.env.SASL_USERNAME) {
      throw new Error('SASL_USERNAME is required');
    }
    if (!process.env.SASL_PASSWORD) {
      throw new Error('SASL_PASSWORD is required');
    }
    if (!process.env.SASL_MECHANISMS) {
      throw new Error('SASL_MECHANISMS is required');
    }
    kafka = new Kafka({
      clientId: 'my-app',
      brokers: [process.env.BOOTSTRAP_SERVER],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: process.env.SASL_USERNAME,
        password: process.env.SASL_PASSWORD,
      },
    });
  }
  return kafka;
}

export const produce = async ({
  topic,
  key,
  value,
}: {
  topic: string;
  key: string | Buffer | null | undefined;
  value: string | Buffer;
}) => {
  logger.debug('produce called');
  logger.info(
    `Producing to topic: ${topic} with key: ${key} and value: ${value}`
  );

  if (!kafka) {
    logger.debug('produce: Creating kafka client');
    kafka = getKafkaClient();
  }

  if (!producer) {
    logger.debug('produce: Creating producer');
    producer = kafka.producer();
  }

  if (!producerConnected) {
    logger.debug('produce: Connecting producer');
    // connect producer
    await producer.connect();
    producerConnected = true;
  }

  logger.debug('produce: Sending message');
  await producer.send({
    topic: topic,
    messages: [{key, value}],
  });
};

export async function consume({
  topic,
  groupId,
  eachMessage,
}: {
  topic: string;
  groupId: string;
  eachMessage: EachMessageHandler | undefined;
}) {
  logger.debug('consume called');
  logger.info(`Consuming from topic: ${topic} with groupId: ${groupId}`);

  if (!kafka) {
    logger.debug('consume: Creating kafka client');
    kafka = getKafkaClient();
  }

  if (!consumer) {
    logger.debug('consume: Creating consumer');
    consumer = kafka.consumer({groupId});
  }

  if (!consumerConnected) {
    logger.debug('consume: Connecting consumer');
    // connect consumer
    await consumer.connect();
    consumerConnected = true;
  }

  logger.debug('consume: Subscribing to topic');
  await consumer.subscribe({topic, fromBeginning: true});

  logger.debug('consume: Running consumer');
  await consumer.run({
    eachMessage,
  });
}

export const test = async () => {
  // Produce
  produce({
    topic: 'user_events',
    key: 'user_created',
    value: JSON.stringify({name: 'John Doe'}),
  });

  // Consume
  consume({
    topic: 'user_events',
    groupId: 'test-group',
    eachMessage: async ({topic, partition, message}) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      });
    },
  });
};
