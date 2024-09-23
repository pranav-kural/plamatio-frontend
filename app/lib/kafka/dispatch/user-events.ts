'use server';
import {CLIENT_ID, TOPICS} from '../constants';
import {produce} from '../core';
import {NewUserEventsMessage, UserEventsMessage} from '../types';
import {Logger} from '@/app/utils/logger/Logger';

// logger
const logger = new Logger({context: 'dispatch/user-events'});

/**
 * Helper function to dispatch a user event.
 * @param message User event message
 */
export async function dispatchUserEvent(newMsg: NewUserEventsMessage) {
  logger.dir(newMsg, 'DEBUG', 'Dispatching user event');
  const topic = TOPICS.USER_EVENTS;
  logger.debug('Producing to topic', topic);
  const message: UserEventsMessage = {
    ...newMsg,
    client_id: CLIENT_ID,
    timestamp: new Date().toISOString(),
  };
  const value = Buffer.from(JSON.stringify(message));
  const key = Buffer.from(message.timestamp);
  logger.dir({topic, key, value}, 'DEBUG', 'Producing message');
  // Produce the message
  produce({topic, key, value});
}
