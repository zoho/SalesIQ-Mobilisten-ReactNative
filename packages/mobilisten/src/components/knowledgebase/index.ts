import RNZohoSalesIQ, { RNZohoSalesIQEmitter } from '../../commons/utils';
import type { ZSIQKnowledgeBaseTypes } from './types/KnowledgeBase';
import { KnowledgeBaseListenerEvent } from './types/Listener';

export const ZSIQKnowledgeBase = {
  KnowledgeBase: {
    isEnabled: function (type, callback) {
      RNZohoSalesIQ.isKnowledgeBaseEnabled(type, callback);
    },
    setVisibility: function (type, shouldShow) {
      RNZohoSalesIQ.setKnowledgeBaseVisibility(type, shouldShow);
    },
    categorize: function (type, shouldCategorize) {
      RNZohoSalesIQ.categorizeKnowledgeBase(type, shouldCategorize);
    },
    combineDepartments: function (type, merge) {
      RNZohoSalesIQ.combineKnowledgeBaseDepartments(type, merge);
    },
    setRecentlyViewedCount: function (limit) {
      RNZohoSalesIQ.setKnowledgeBaseRecentlyViewedCount(limit);
    },
    getResourceDepartments: function (callback) {
      RNZohoSalesIQ.getKnowledgeBaseResourceDepartments(callback);
    },
    open: function (type, id, callback) {
      RNZohoSalesIQ.openKnowledgeBase(type, id, callback);
    },
    getSingleResource: function (type, id, third: any = undefined) {
      if (typeof third === 'boolean') {
        // Extended signature: getSingleResource(type, id, shouldFallbackToDefaultLanguage)
        // returns a Promise<Resource>.
        return RNZohoSalesIQ.getKnowledgeBaseSingleResourceWithLanguageFallback(
          type,
          id,
          third
        );
      }
      // Legacy signature: getSingleResource(type, id, callback) — `third` is the callback.
      RNZohoSalesIQ.getKnowledgeBaseSingleResource(type, id, third);
    },
    getResources: function (
      type,
      departmentId = null,
      parentCategoryId = null,
      page = 1,
      limit = 99,
      searchKey = null,
      seventh: any = undefined
    ) {
      if (typeof seventh === 'boolean') {
        // Extended signature: getResources(type, departmentId, parentCategoryId, page, limit,
        //                     searchKey, includeChildCategoryResources) returns a Promise.
        return RNZohoSalesIQ.getKnowledgeBaseResourcesWithChildCategories(
          type,
          departmentId,
          parentCategoryId,
          page,
          limit,
          searchKey,
          seventh
        );
      }
      // Legacy signature: getResources(type, departmentId, parentCategoryId, page, limit,
      //                   searchKey, callback) — `seventh` is the callback.
      RNZohoSalesIQ.getKnowledgeBaseResources(
        type,
        departmentId,
        parentCategoryId,
        page,
        limit,
        searchKey,
        seventh
      );
    },
    getCategories: function (
      type,
      departmentId = null,
      parentCategoryId = null,
      callback
    ) {
      RNZohoSalesIQ.getKnowledgeBaseCategories(
        type,
        departmentId,
        parentCategoryId,
        callback
      );
    },
    addListener: function (callback) {
      return RNZohoSalesIQEmitter.addListener(
        'KNOWLEDGEBASE_EVENT_LISTENER',
        callback
      );
    },
    Event: KnowledgeBaseListenerEvent,
  },
} as ZSIQKnowledgeBaseTypes;
