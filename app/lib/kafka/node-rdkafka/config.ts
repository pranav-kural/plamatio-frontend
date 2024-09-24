import Kafka from 'node-rdkafka';
import {Logger} from '@/app/utils/logger/Logger';

// logger
const log = new Logger({context: 'kafka-config'});

// Variable to store details of the Kafka configurations (for Singleton pattern)
let kafkaConfig: Kafka.GlobalConfig;

/**
 * Method to get Kafka configurations
 * @returns Kafka configurations
 */
export function getKafkaConfig() {
  log.debug('getKafkaConfig called');
  if (!kafkaConfig) {
    kafkaConfig = _getKafkaConfig();
  }
  return kafkaConfig;
}

/**
 * Method to get Kafka configurations from environment variables
 * @returns Kafka configurations
 */
function _getKafkaConfig() {
  log.debug('_getKafkaConfig called');
  // validate environment variables
  if (!process.env.BOOTSTRAP_SERVERS) {
    throw new Error('BOOTSTRAP_SERVERS is required');
  }
  if (!process.env.SECURITY_PROTOCOL) {
    throw new Error('SECURITY_PROTOCOL is required');
  }
  if (!process.env.SASL_MECHANISMS) {
    throw new Error('SASL_MECHANISMS is required');
  }
  if (!process.env.SASL_USERNAME) {
    throw new Error('SASL_USERNAME is required');
  }
  if (!process.env.SASL_PASSWORD) {
    throw new Error('SASL_PASSWORD is required');
  }

  // validate security protocol
  if (
    process.env.SECURITY_PROTOCOL !== 'sasl_ssl' &&
    process.env.SECURITY_PROTOCOL !== 'ssl'
  ) {
    throw new Error('SECURITY_PROTOCOL must be either SASL_SSL or SSL');
  }

  const config: Kafka.GlobalConfig = {
    'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
    'security.protocol': process.env.SECURITY_PROTOCOL,
    'sasl.mechanisms': process.env.SASL_MECHANISMS,
    'sasl.username': process.env.SASL_USERNAME,
    'sasl.password': process.env.SASL_PASSWORD,
    debug: process.env.DEBUG,
  };

  return config;
}
