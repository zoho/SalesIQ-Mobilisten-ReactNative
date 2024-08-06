import type {
  CallbackError
} from '../../../types/ZSIQWrapperTypes';
import type {
  KnowledgeBaseListenerEvent,
  knowledgeBaseListeners,
} from './Listener';
import type { Category, Resource } from './Resource';

export enum ResourceType {
  ARTICLES = 'RESOURCE_ARTICLES',
}

interface ResourceDepartment {
  id?: string;
  name?: string;
}

export interface ZSIQKnowledgeBaseTypes {
  KnowledgeBase: {
    /**
     * This API allows to get the status (enabled/disabled) of the specified resource type in the portal.
     *
     * @param type - (articles) The type of the resource.
     * @param callback - This callback returns a boolean value: `true` signifies that the specified resource type is enabled, while `false` indicates it is disabled.
     * @returns
     */
    isEnabled: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      callback: (value: boolean) => void
    ) => void;
    /**
     * This API allows to manage the visibility of the resources in the Mobilisten knowledge base section.
     *
     * @param type - (Article) The type of the resource
     * @param shouldShow -  (true/false) `true` will display the resource type, and `false` will hide. The default value is `true`.
     * @returns
     *
     * The API will work when the "Articles" is enabled under brand settings. To check, from your SalesIQ dashboard, navigate to `Settings > Brands > Personalisation > Knowledge Base > Article`.
     */
    setVisibility: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      shouldShow: boolean
    ) => void;
    /**
     * This API allows managing category visibility while displaying the resources in the Mobilisten knowledge base section.
     *
     * @param type - (Articles) The type of the resource
     * @param shouldCategorize - (true/false)
     *
     * - *true* - will list the categories, and when a category is selected, only the resources associated with the selected category will be listed. The default value is true.
     *
     * - *false* - will hide the categories and list all the resources.
     *
     * @returns
     */
    categorize: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      shouldCategorize: boolean
    ) => void;
    /**
     * This API allows to manage the department's visibility while displaying the resources in the Mobilisten knowledge base section.
     *
     * @param type - (Articles) The type of the resource.
     *
     *
     * @param merge - (true/false) 
     * - `true` - will hide the departments and merge resources from all the departments. 
     * - `false` - will list the departments. When a department is selected, only the resources associated with the selected department will be listed.
     * @returns
     */
    combineDepartments: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      merge: boolean
    ) => void;
    /**
     * This API allows configuring the number of recently viewed resources to be displayed in the Mobilisten UI.
     *
     * @param limit - The number limit to display recently viewed resources. The default value is 5.
     * @returns
     */
    setRecentlyViewedCount: (limit: number) => void;
    /**
     * This API allows fetching the list of resource departments associated with the brand. Upon execution, the array of `ResourceDepartment` objects will include the resource departments under the brand settings `(Settings > Brand > Select your brand > Flow Controls > Department responsible for chats/Use the resource of associated department)`.
     * @param callback - `(Optional)`: A closure that receives an array of `ResourceDepartment` as its parameter, when the operation is completed.
     * @returns
     */
    getResourceDepartments: (
      callback: (error: CallbackError, departments: ResourceDepartment[]) => void
    ) => void;
    /**
     * This API helps to open a specific resource.
     * @param type - (Article) Type of the resource
     * @param id - ID of the resource
     * @param callback - The callback for the resource if it's failed or opened successfully
     *
     * @see
     *
     * Errorcodes:
     * - `18008`	Provide a valid language code.
     * - `18009`	Provided language code is not supported.
     * - `500`	Mobilisten SDK not initialized.
     * - `600`	No network connection.
     * - `605`	Mobilisten SDK is disabled.
     *
     * @returns
     */
    open: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      id: string,
      callback: (error: CallbackError, success: boolean) => void
    ) => void;
    /**
     * This API allows getting details of a resource.
     *
     * @param type - Type of the resource
     * @param id - ID of the resource
     * @param callback - The callback to get the resources details.
     *
     * @see Errorcodes:
     * - `500` - Mobilisten SDK not initialized
     * - `600` - No network connection
     * - `605` - Mobilisten SDK is disabled
     *
     * @returns
     */
    getSingleResource: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      id: string,
      callback: (error: CallbackError, resource: Resource) => void
    ) => void;
    /**
     * This API allows to get a list of resources (articles). To get a specific resource list, use the below parameters as filters.
     * @param type `(Article)` - The type of the resource.
     * @param departmentId `(Optional)` - Department ID to fetch resource associated with it.
     * @param parentCategoryId `(Optional)` - Category ID to get the articles.
     * @param page `(Optional)` - Specify the number of pages. (Default value is 1)
     * @param limit `(Optional)` - Specify the number of articles to be fetched for a page. (Default & maximum value is 99)
     * @param searchKey `(Optional)` - A search keyword to further filter the results.
     * @param callback - The callback to get the resources.
     *
     * @property `moreDataAvailable` - (callback parameter) A boolean indicating an excess of resources beyond the specified page limit​
     *
     * @see
     * Errorcodes:
     * - `500` -	Mobilisten SDK not initialized
     * - `600` -	No network connection
     * - `605` -	Mobilisten is disabled
     * @returns
     */
    getResources: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      departmentId: string | null,
      parentCategoryId: string | null,
      page: number,
      limit: number,
      searchKey: string | null,
      callback: (
        error: CallbackError,
        resources: Resource[],
        moreDataAvailable: boolean
      ) => void
    ) => void;
    /**
     * This API allows to get a list of resource's (article) categories based on the below parameters. To get a specific resource list, use the below parameters as filters.
     * @param type - `(Articles)` The type of the resource.
     * @param departmentId `(Optional)` - Department ID to fetch resource categories associated with it.
     * @param parentCategoryId
     * @param callback
     * @returns
     */
    getCategories: (
      type: (typeof ResourceType)[keyof typeof ResourceType],
      departmentId: string | null,
      parentCategoryId: string | null,
      callback: (error: CallbackError, categories: Category[]) => void
    ) => void;
    /**
     * This listener provides resource event callbacks, allowing you to monitor various visitor actions related to the resources. These actions includes opening, closing, liking and disliking a resource.
     * @param callback
     * @returns
     */
    addListener: (
      callback: (callbackData: knowledgeBaseListeners) => void
    ) => void;
    Event: typeof KnowledgeBaseListenerEvent;
  };
}
//# sourceMappingURL=KnowledgeBase.d.ts.map
