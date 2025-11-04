import { ZohoSalesIQ } from '@react-native-zohosalesiq/mobilisten';

export const addListeners = () => {
  const { Chat, KnowledgeBase, Launcher, Notification } = ZohoSalesIQ;
  Chat.addListener(({ event, body }) => {
    switch (event) {
      case Chat.Event.CHAT_ATTENDED:
        // body: SalesIQChat
        console.log(body, 'EVENT_CHAT_ATTENDED');
        break;

      case Chat.Event.CHAT_UNREAD_COUNT_CHANGED:
        // body: number
        console.log(body, 'EVENT_CHAT_UNREAD_COUNT_CHANGED');
        break;

      case Chat.Event.CHAT_CLOSED:
        // body: SalesIQChat
        console.log(body, 'EVENT_CHAT_CLOSED');
        break;
      case Chat.Event.CHAT_MISSED:
        // body: SalesIQChat
        console.log(body, 'EVENT_CHAT_MISSED');
        break;
      case Chat.Event.CHAT_OPENED:
        // body: SalesIQChat
        console.log(body, 'EVENT_CHAT_OPENED');
        break;
      case Chat.Event.CHAT_QUEUE_POSITION_CHANGED:
        // body: SalesIQChat
        console.log(body.queuePosition, 'EVENT_CHAT_QUEUE_POSITION_CHANGED');
        break;
      case Chat.Event.CHAT_REOPENED:
        // body: SalesIQChat
        console.log(body, 'EVENT_CHAT_REOPENED');
        break;

      case Chat.Event.FEEDBACK_RECEIVED:
        // body: SalesIQChat
        console.log(body.feedback, 'EVENT_FEEDBACK_RECEIVED');
        break;

      case Chat.Event.HANDLE_URL:
        // body: SalesIQChat
        console.log(body.url, body.chat, 'EVENT_HANDLE_URL');
        break;

      case Chat.Event.RATING_RECEIVED:
        // body: SalesIQChat
        console.log(body.rating, 'EVENT_RATING_RECEIVED');
        break;

      case Chat.Event.BOT_TRIGGER:
        // body: null
        console.log('EVENT_BOT_TRIGGER');
        break;
      case Chat.Event.CHAT_VIEW_CLOSED:
        console.log(body.id, 'EVENT_CHATVIEW_CLOSED');
        break;
      case Chat.Event.CHAT_VIEW_OPENED:
        console.log(body.id, 'EVENT_CHATVIEW_OPENED');
        break;

      case Chat.Event.CUSTOM_TRIGGER:
        // body: SalesIQChat
        console.log(body.triggerName, 'EVENT_CUSTOMTRIGGER');
        console.log(body.visitorInformation, 'EVENT_CUSTOMTRIGGER');
        break;

      case Chat.Event.PERFORM_CHATACTION:
        console.log(JSON.stringify(body, null, 4), 'EVENT_PERFORM_CHATACTION');
        break;
      default:
        break;
    }
  });

  KnowledgeBase.addListener(({ event, body }) => {
    switch (event) {
      case KnowledgeBase.Event.RESOURCE_OPENED:
        console.log(body.resource, 'EVENT_RESOURCE_OPENED');
        console.log(body.type, 'EVENT_RESOURCE_OPENED');
        break;

      case KnowledgeBase.Event.RESOURCE_CLOSED:
        console.log(body.resource, 'EVENT_RESOURCE_CLOSED');
        console.log(body.type, 'EVENT_RESOURCE_CLOSED');
        break;
      case KnowledgeBase.Event.RESOURCE_LIKED:
        console.log(body.resource, 'EVENT_RESOURCE_LIKED');
        console.log(body.type, 'EVENT_RESOURCE_LIKED');
        break;
      case KnowledgeBase.Event.RESOURCE_DISLIKED:
        console.log(body.resource?.ratedType, 'EVENT_RESOURCE_DISLIKED');
        console.log(body.type, 'EVENT_RESOURCE_DISLIKED');
        break;
      default:
        break;
    }
  });

  Launcher.addListener((payload) => {
    const { event, body } = payload;
    switch (event) {
      case Launcher.Event.HANDLE_CUSTOM_LAUNCHER_VISIBILITY:
        console.log('EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY');
        break;

      default:
        break;
    }
  });

  ZohoSalesIQ.addListener((payload) => {
    const { event } = payload;
    switch (event) {
      case ZohoSalesIQ.Event.OPERATORS_OFFLINE:
        console.log('EVENT_OPERATORS_OFFLINE');
        break;
      case ZohoSalesIQ.Event.OPERATORS_ONLINE:
        console.log('EVENT_OPERATORS_ONLINE');
        break;
      case ZohoSalesIQ.Event.SUPPORT_CLOSED:
        console.log('EVENT_SUPPORT_CLOSED');
        break;
      case ZohoSalesIQ.Event.SUPPORT_OPENED:
        console.log('EVENT_SUPPORT_OPENED');
        break;
      case ZohoSalesIQ.Event.VISITOR_IPBLOCKED:
        console.log('EVENT_VISITOR_IPBLOCKED');
        break;

      default:
        break;
    }
  });

  console.log(ZohoSalesIQ.Event, 'ZohoSalesIQ.Event');

  Notification.addListener(({ event, body }) => {
    switch (event) {
      case Notification.Event.NOTIFICATION_CLICKED:
        console.log('EVENT_NOTIFICATION_CLICKED', body);
        Chat.open(body.payload);

        break;

      default:
        break;
    }
  });

  console.log('ADD LISTENER CALLED');
  /*
        The Mobilisten React-Native SDK would invoke callback methods for various actions performed by the visitors.
        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-add-event-listener.html
    */
  ZohoSalesIQ.addEventListener(ZohoSalesIQ.EVENT_SUPPORT_OPENED, () => {
    console.log('SUPPORT OPENED EVENT CALLED');
  });
  ZohoSalesIQ.addEventListener(ZohoSalesIQ.EVENT_SUPPORT_CLOSED, () => {
    console.log('SUPPORT CLOSED EVENT CALLED');
  });
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHATVIEW_OPENED,
    (chatID: string | number) => {
      if (chatID !== null) {
        console.log('CHAT VIEW OPENED EVENT CALLED, Chat ID: #' + chatID);
      } else {
        console.log('EMPTY CHAT VIEW OPENED EVENT CALLED');
      }
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHATVIEW_CLOSED,
    (chatID: string | number) => {
      if (chatID !== null) {
        console.log('CHAT VIEW CLOSED EVENT CALLED, Chat ID: #' + chatID);
      } else {
        console.log('EMPTY CHAT VIEW CLOSED EVENT CALLED');
      }
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHAT_OPENED,
    (visitorChat: object) => {
      console.log(
        'CHAT OPENED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHAT_CLOSED,
    (visitorChat: object) => {
      console.log(
        'CHAT CLOSED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHAT_REOPENED,
    (visitorChat: object) => {
      console.log(
        'CHAT REOPENED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHAT_QUEUE_POSITION_CHANGED,
    (visitorChat: object) => {
      console.log(
        'CHAT QUEUE POSITION CHANGED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHAT_ATTENDED,
    (visitorChat: object) => {
      console.log(
        'CHAT ATTENDED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHAT_MISSED,
    (visitorChat: object) => {
      console.log(
        'CHAT MISSED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_RESOURCE_OPENED,
    (resource: object) => {
      console.log(
        'RESOURCE OPENED EVENT CALLED, Resource Object: ' +
          JSON.stringify(resource, null, 2)
      );
    }
  );

  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_RESOURCE_CLOSED,
    (resource: object) => {
      console.log(
        'RESOURCE CLOSED EVENT CALLED, Resource Object: ' +
          JSON.stringify(resource, null, 2)
      );
    }
  );

  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_RESOURCE_LIKED,
    (resource: object) => {
      console.log(
        'RESOURCE LIKED EVENT CALLED, Resource Object: ' +
          JSON.stringify(resource, null, 2)
      );
    }
  );

  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_RESOURCE_DISLIKED,
    (resource: object) => {
      console.log(
        'RESOURCE DISLIKED EVENT CALLED, Resource Object: ' +
          JSON.stringify(resource, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_ARTICLE_OPENED,
    (articleID: string | number) => {
      console.log('ARTICLE OPENED EVENT CALLED, Article ID: ' + articleID);
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_ARTICLE_CLOSED,
    (articleID: string | number) => {
      console.log('ARTICLE CLOSED EVENT CALLED, Article ID: ' + articleID);
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_ARTICLE_LIKED,
    (articleID: string | number) => {
      console.log('ARTICLE LIKED EVENT CALLED, Article ID: ' + articleID);
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_ARTICLE_DISLIKED,
    (articleID: string | number) => {
      console.log('ARTICLE DISLIKED EVENT CALLED, Article ID: ' + articleID);
    }
  );
  ZohoSalesIQ.addEventListener(ZohoSalesIQ.EVENT_OPERATORS_ONLINE, () => {
    console.log('OPERATORS ONLINE EVENT CALLED');
  });
  ZohoSalesIQ.addEventListener(ZohoSalesIQ.EVENT_OPERATORS_OFFLINE, () => {
    console.log('OPERATORS OFFLINE EVENT CALLED');
  });
  ZohoSalesIQ.addEventListener(ZohoSalesIQ.EVENT_VISITOR_IPBLOCKED, () => {
    console.log('VISITOR IP ADDRESS BLOCKED EVENT CALLED');
  });
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_FEEDBACK_RECEIVED,
    (visitorChat: any) => {
      console.log(
        'FEEDBACK RECEIVED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_RATING_RECEIVED,
    (visitorChat: any) => {
      console.log(
        'RATING RECEIVED EVENT CALLED, Visitor Chat Object: ' +
          JSON.stringify(visitorChat, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CUSTOMTRIGGER,
    (triggerInformation: any) => {
      console.log(
        'CUSTOM TRIGGER EVENT CALLED, Trigger Information Object: ' +
          JSON.stringify(triggerInformation, null, 2)
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_CHAT_UNREAD_COUNT_CHANGED,
    (unreadCount: any) => {
      console.log(
        'CHAT UNREAD COUNT CHANGED EVENT CALLED, Unread count: ' + unreadCount
      );
    }
  );
  ZohoSalesIQ.addEventListener(ZohoSalesIQ.EVENT_HANDLE_URL, (chat: any) => {
    console.log('HANDLE URL EVENT CALLED, URL: ' + chat.url);
  });
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY,
    (shouldEnable: any) => {
      console.log(
        'HANDLE CUSTOM LAUNCHER VISIBILITY EVENT CALLED:- ' + shouldEnable
      );
    }
  );
  ZohoSalesIQ.addEventListener(
    ZohoSalesIQ.EVENT_PERFORM_CHATACTION,
    (actionDetails: any) => {
      if (actionDetails.clientActionName == 'book_ticket') {
        if (isUserLoggedIn()) {
          bookTicket();
          ZohoSalesIQ.sendEvent(
            ZohoSalesIQ.Event.COMPLETE_CHAT_ACTION,
            actionDetails.uuid,
            true,
            'Your tickets are booked!'
          );
        } else {
          ZohoSalesIQ.sendEvent(
            ZohoSalesIQ.Event.COMPLETE_CHAT_ACTION,
            actionDetails.uuid,
            false,
            'Please login to continue'
          );
        }
      }
    }
  );
  const isUserLoggedIn = () => {
    return true;
  };
  const bookTicket = () => {
    console.log('Booking ticket...');
  };
};
