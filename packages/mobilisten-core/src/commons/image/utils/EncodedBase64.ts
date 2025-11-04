import { ImageRequireSource } from 'react-native';

// Utility to convert ArrayBuffer/Uint8Array to Base64
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Utility to validate Base64 string
const isBase64String = (str: string): boolean => /^[A-Za-z0-9+/=]+$/.test(str);

export async function getBase64EncodedImage(source: any): Promise<string | null> {
  try {
    console.log('[getBase64EncodedImage] Input source:', source);
    console.log('[getBase64EncodedImage] Source type:', typeof source);

    if (source == null) {
      console.log('[getBase64EncodedImage] Source is null or undefined, returning null');
      return null;
    }

    let bytes: Uint8Array | null = null;

    // 1. Network image (string starting with http or https)
    if (typeof source === 'string' && source.startsWith('http')) {
      console.log('[getBase64EncodedImage] Case 1: Network image detected, URL:', source);
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        console.log('[getBase64EncodedImage] Starting fetch with 10s timeout...');
        const response = await fetch(source, { signal: controller.signal });
        clearTimeout(timeoutId);

        console.log('[getBase64EncodedImage] Fetch response status:', response.status, response.statusText);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          bytes = new Uint8Array(arrayBuffer);
          console.log('[getBase64EncodedImage] Successfully fetched image, bytes length:', bytes.length);
        } else {
          console.log('[getBase64EncodedImage] Failed to fetch image, response not ok');
        }
      } catch (fetchError) {
        console.log('[getBase64EncodedImage] Fetch error:', fetchError);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.log('[getBase64EncodedImage] Fetch timed out after 10 seconds');
        }
      }
    }
    // 2. Base64-encoded string
    else if (typeof source === 'string' && isBase64String(source)) {
      console.log('[getBase64EncodedImage] Case 2: Base64 string detected, returning as is');
      return source;
    }
    // 3. Raw bytes (ArrayBuffer or Uint8Array)
    else if (source instanceof ArrayBuffer || source instanceof Uint8Array) {
      console.log('[getBase64EncodedImage] Case 3: Raw bytes detected, type:', source.constructor.name);
      bytes = source instanceof ArrayBuffer ? new Uint8Array(source) : source;
      console.log('[getBase64EncodedImage] Bytes length:', bytes.length);
    }
    // 4. File URI (limited support: e.g., { uri: string } from Image component)
    else if (typeof source === 'object' && source != null && 'uri' in source && typeof source.uri === 'string') {
      console.log('[getBase64EncodedImage] Case 4: Object with URI detected, URI:', source.uri);
      const uri = source.uri;
      if (uri.startsWith('http')) {
        console.log('[getBase64EncodedImage] URI is a network URL, fetching...');
        try {
          // Add timeout to prevent hanging
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

          console.log('[getBase64EncodedImage] Starting fetch with 10s timeout...');
          const response = await fetch(uri, { signal: controller.signal });
          clearTimeout(timeoutId);

          console.log('[getBase64EncodedImage] Fetch response status:', response.status, response.statusText);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            bytes = new Uint8Array(arrayBuffer);
            console.log('[getBase64EncodedImage] Successfully fetched image from URI, bytes length:', bytes.length);
          } else {
            console.log('[getBase64EncodedImage] Failed to fetch image from URI, response not ok');
          }
        } catch (fetchError) {
          console.log('[getBase64EncodedImage] Fetch error for URI:', fetchError);
          if (fetchError instanceof Error && fetchError.name === 'AbortError') {
            console.log('[getBase64EncodedImage] Fetch timed out after 10 seconds for URI');
          }
        }
      } else {
        console.warn('[getBase64EncodedImage] File URI not supported without react-native-fs');
        return null;
      }
    }
    // 5. Asset (string path or ImageRequireSource)
    else if (typeof source === 'string' && !source.startsWith('http')) {
      console.log('[getBase64EncodedImage] Case 5a: Asset string path detected:', source);
      console.warn('Asset loading requires react-native-fs or specific asset handling');
      return null;
    }
    else if (typeof source === 'number' || (source && typeof source === 'object' && 'uri' in source)) {
      console.log('[getBase64EncodedImage] Case 5b: Asset number or object with uri detected:', source);
      console.warn('Asset loading requires react-native-fs or specific asset handling');
      return null;
    }

    // Convert bytes to Base64
    if (bytes) {
      console.log('[getBase64EncodedImage] Converting bytes to Base64, bytes length:', bytes.length);
      const base64String = arrayBufferToBase64(bytes);
      console.log('[getBase64EncodedImage] Successfully converted to Base64, string length:', base64String.length);
      return `data:image/jpeg;base64,${base64String}`;
    }

    // Unsupported types
    if (typeof source === 'object') {
      console.log('[getBase64EncodedImage] Unsupported object type detected:', source);
      throw new Error('Cannot extract image from custom object directly.');
    }

    console.log('[getBase64EncodedImage] No matching case found, returning null');
    return null;
  } catch (e) {
    console.log(`[getBase64EncodedImage] Error loading image bytes: ${e}`);
    return null;
  }
}