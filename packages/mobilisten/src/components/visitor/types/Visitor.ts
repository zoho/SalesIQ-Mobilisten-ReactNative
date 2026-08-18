// ─── SIQVisitorContact ────────────────────────────────────────────────────────

/**
 * Represents a visitor's phone contact with an optional country dialing code.
 * Mirrors `SIQVisitorContact` on iOS.
 */
export type SIQVisitorContact = {
  /** Country dialing code, e.g. `"+1"`, `"+44"`. */
  code?: string;
  /** Phone number. */
  number?: string;
};

// ─── SIQVisitorLocation ───────────────────────────────────────────────────────

/**
 * Represents a visitor's geographic location.
 * Mirrors `SIQVisitorLocation` on iOS.
 *
 * Latitude must be in range `[-90, 90]` and longitude in `[-180, 180]`.
 * If either value is out of range, both will be ignored by the SDK.
 */
export type SIQVisitorLocation = {
  /** ISO 3166-1 alpha-2 country code, e.g. `"US"`. */
  countryCode?: string;
  /** The location's latitude. */
  latitude?: number;
  /** The location's longitude. */
  longitude?: number;
  /** The city name. */
  city?: string;
  /** The postal/ZIP code. */
  zipCode?: string;
  /** The state or province name. */
  state?: string;
  /** The country name. */
  country?: string;
};

// ─── SIQSalutation ────────────────────────────────────────────────────────────

/**
 * The salutation/title for a visitor, set on the `salutation` field of a {@link SalesIQVisitorProfile}.
 */
export enum SIQSalutation {
  /** "Mr" salutation. */
  Mr = 'mr',
  /** "Ms" salutation. */
  Ms = 'ms',
  /** "Mrs" salutation. */
  Mrs = 'mrs',
  /** "Dr" salutation. */
  Dr = 'dr',
  /** "Prof" salutation. */
  Prof = 'prof',
  /** No salutation. */
  None = 'none',
}

// ─── SalesIQVisitorProfile ────────────────────────────────────────────────────

/**
 * A structured profile object used to update a visitor's information in SalesIQ.
 * Mirrors `SalesIQVisitorProfile` on iOS.
 *
 * @example
 * ```ts
 * ZohoSalesIQ.Visitor.updateProfile({
 *   firstName: 'Jane',
 *   lastName: 'Doe',
 *   emailID: 'jane@example.com',
 *   phone: { code: '+1', number: '5550001234' },
 *   location: { countryCode: 'US', city: 'San Francisco' },
 *   customInfo: { plan: 'premium' },
 * });
 * ```
 */
export type SalesIQVisitorProfile = {
  /** The visitor's salutation/title. */
  salutation?: SIQSalutation;
  /** The visitor's first name. */
  firstName?: string;
  /** The visitor's last name. */
  lastName?: string;
  /** The visitor's email address. */
  emailID?: string;
  /** A unique identifier for the visitor. */
  userID?: string;
  /** The visitor's phone contact. */
  phone?: SIQVisitorContact;
  /** The visitor's geographic location. */
  location?: SIQVisitorLocation;
  /** Additional key-value pairs to attach to the visitor profile. */
  customInfo?: Record<string, string>;
};

// ─── ZSIQVisitorTypes interface ───────────────────────────────────────────────

export interface ZSIQVisitorTypes {
  /** Namespace for managing the current visitor — updating their profile and performing custom actions. */
  Visitor: {
    /**
     * Updates the visitor's profile in SalesIQ.
     *
     * Mirrors `ZohoSalesIQ.Visitor.updateProfile(_ user: SalesIQVisitorProfile)` on iOS.
     *
     * @param profile - The visitor profile data to update.
     *
     * @example
     * ```ts
     * ZohoSalesIQ.Visitor.updateProfile({
     *   firstName: 'Jane',
     *   lastName: 'Doe',
     *   emailID: 'jane@example.com',
     *   userID: 'user_123',
     *   phone: { code: '+1', number: '5550001234' },
     *   customInfo: { plan: 'premium' },
     *   location: { countryCode: 'US', city: 'San Francisco', latitude: 37.77, longitude: -122.41 },
     * });
     * ```
     *
     * @returns A promise that resolves once the profile has been updated.
     */
    updateProfile: (profile: SalesIQVisitorProfile) => Promise<void>;

    /**
     * Performs a custom action for the visitor.
     *
     * @param actionName - The name of the custom action to perform.
     * @returns A promise that resolves once the custom action has been performed.
     */
    performCustomAction: (actionName: string) => Promise<void>;
  };
}
