import { SalesIQAuth } from './SalesIQAuth';

/**
 * A registered (identified) visitor authenticated to SalesIQ by their unique user id.
 */
export class SalesIQUser extends SalesIQAuth {
  /** Discriminator identifying this auth type as a registered visitor. */
  type: string = 'registered_visitor';
  /** The unique identifier of the registered visitor. */
  userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}

/**
 * An anonymous (guest) visitor authenticated to SalesIQ without a user id.
 */
export class SalesIQGuestUser extends SalesIQAuth {
  /** Discriminator identifying this auth type as a guest visitor. */
  type: string = 'guest';
}

// SIQJWTAuth is temporarily disabled until the dedicated auth-flow API lands.
// Uncomment (and re-add to the export in src/index.tsx) to restore.
// /**
//  * JWT based auth data used to authenticate the user during SDK initialization.
//  * Pass an instance as `auth` in the `SalesIQConfiguration` given to `ZohoSalesIQ.initialize()`.
//  */
// export class SIQJWTAuth extends SalesIQAuth {
//     type: string = "jwt";
//     token: string;
//
//     constructor(token: string) {
//         super();
//         this.token = token;
//     }
// }
