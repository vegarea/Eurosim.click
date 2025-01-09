import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ResendEmailsResponse } from "../types/resendLogs";

export const useResendLogs = (page: number = 1, limit: number = 8) => {
  return useQuery({
    queryKey: ["resend-logs", page, limit],
    queryFn: async (): Promise<ResendEmailsResponse> => {
      const { data, error } = await supabase.functions.invoke('get-resend-logs', {
        body: { page, limit }
      });

      if (error) throw error;
      return data;
    },
  });
};