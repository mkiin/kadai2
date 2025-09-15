import { supabase } from "@/lib/supabase";
import type { TablesInsert as TablesInsertType } from "@/types/database.types";

type InsertRecordType = TablesInsertType<"study_record">;

export const getRecords = async () => {
  const { data, error } = await supabase
    .from("study_record")
    .select("id, title, time, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const createRecords = async (record: InsertRecordType) => {
  const { data, error } = await supabase
    .from("study_record")
    .insert({
      title: record.title,
      time: record.time,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

/**
 * ボタンを押す
 */

export const deleteRecords = async (RecordId: string) => {
  const { data, error } = await supabase
    .from("study_record")
    .delete()
    .eq("id", RecordId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
