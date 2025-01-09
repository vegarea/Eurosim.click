import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EmailLog } from "../types/emailLogs";

export const useEmailLogs = () => {
  return useQuery({
    queryKey: ["emailLogs"],
    queryFn: async (): Promise<EmailLog[]> => {
      const { data, error } = await supabase
        .from("email_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};