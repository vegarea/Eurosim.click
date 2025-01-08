import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function TrackingScripts() {
  const { data: siteSettings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('tracking_scripts')
        .single();

      if (error) throw error;
      return data;
    }
  });

  const scripts = siteSettings?.tracking_scripts as Record<string, string> || {};

  return (
    <Helmet>
      {/* Google Analytics */}
      {scripts.google_analytics && (
        <script>{scripts.google_analytics}</script>
      )}

      {/* Facebook Pixel */}
      {scripts.facebook_pixel && (
        <script>{scripts.facebook_pixel}</script>
      )}

      {/* Other Scripts */}
      {scripts.other_scripts && (
        <script>{scripts.other_scripts}</script>
      )}
    </Helmet>
  );
}
