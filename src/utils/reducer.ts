import { AppMiddlewareMeta } from 'src/types/messages';
import { createAction } from '@reduxjs/toolkit';
import { Utility } from 'src/utils/util';

export function createAppAction<T>(type: string, metadata?: AppMiddlewareMeta) {
  return createAction(type, (payload: T) => {
    return {
      payload: Utility.isDefined(payload)
        ? JSON.parse(JSON.stringify(payload))
        : {},
      meta: metadata,
    };
  });
}
