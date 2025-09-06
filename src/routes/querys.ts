import { supabase } from "@/lib/supabase";
import type { Tables as TableType, TablesInsert as TablesInsertType } from "@/types/database.types";

type RecordType = TableType<"study_record">
type InsertRecordType = TablesInsertType<"study_record">

export const getRecords = async() => {
  try {
    const { data, error } = await supabase
      .from("study_record")
      .select("id, title, time")
      .order("created_at", {ascending  :false})
      .limit(3);
    if (error) throw error;
    return data;
  } catch (error) {
    return [];
  }
}

export const createRecords = async (record : InsertRecordType) => {
  try {
      const { data, error } = await supabase
      .from("study_record")
      .insert({ 
        title : record.title,
        time : record.time
       })
       .select()
       if (error) throw error;
       return data;
    } catch (error) {
      console.error(error);
      return [];
    }
}

/**
 * ボタンを押す 
 */

export const deleteRecords = async (RecordId : Pick<RecordType, "id"> ) => {
  try {
    const { error } = await supabase
      .from("study_record")
      .delete()
      .eq("id", RecordId.id)
    if (error) throw error
  } catch (error) {
    console.error(error);
    return [];
  }
}