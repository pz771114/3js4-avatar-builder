import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);
export const useStore = create((set) => ({
  categories: [],
  //currentCategory: null,
  assets: [],
  customization: {},
  fetchCategories: async () => {
    try {
      const { data: groups, error } = await supabase
        .from("groups")
        .select(`name,assets (id,url,thumbnail)`)
        .throwOnError();
      const customization = {};
      if (groups) {
        set({ categories: groups });
        groups.forEach((category) => {
          customization[category.name] = {};
        });
        set({ customization });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  fetchAssets: async () => {
    /*const [groupsRes, assetsRes] = await Promise.all([
      supabase.from("groups").select("*"),
      supabase.from("assets").select("*"),
    ]);*/

    let { data: assets, error } = await supabase.from("assets").select("*");

    set({
      assets,
    });
  },
  changeAsset: (category, asset) =>
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        },
      },
    })),
}));
