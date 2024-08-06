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
    getSingleResource: function (type, id, callback) {
      RNZohoSalesIQ.getKnowledgeBaseSingleResource(type, id, callback);
    },
    getResources: function (
      type,
      departmentId = null,
      parentCategoryId = null,
      page = 1,
      limit = 99,
      searchKey = null,
      callback
    ) {
      RNZohoSalesIQ.getKnowledgeBaseResources(
        type,
        departmentId,
        parentCategoryId,
        page,
        limit,
        searchKey,
        callback
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
      RNZohoSalesIQEmitter.addListener("KNOWLEDGEBASE_EVENT_LISTENER", callback);
    },
    Event: KnowledgeBaseListenerEvent,
  },
} as ZSIQKnowledgeBaseTypes;
