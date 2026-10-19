import { permanentRedirect } from 'next/navigation';

/** Legacy URL — canonical page is /advertise */
export default function AdvertisingRedirectPage() {
  permanentRedirect('/advertise');
}
