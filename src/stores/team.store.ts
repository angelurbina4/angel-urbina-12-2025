import { defineStore } from "pinia";

interface TeamState {
  teamIds: number[];
}
const MAX_TEAM_SIZE = 6;

export const useTeamStore = defineStore("team", {
  state: (): TeamState => ({
    teamIds: [],
  }),
  getters: {
    count: (state) => state.teamIds.length,
    isFull: (state) => state.teamIds.length >= MAX_TEAM_SIZE,
    has: (state) => (id: number) => state.teamIds.includes(id),
  },
  actions: {
    add(id: number) {
      if (this.isFull || this.has(id)) return;
      this.teamIds.push(id);
    },
    addMany(ids: number[]) {
      const merged = [...this.teamIds];
      ids.forEach((id) => {
        if (!merged.includes(id) && merged.length < MAX_TEAM_SIZE) {
          merged.push(id);
        }
      });
      this.teamIds = merged;
    },
    remove(id: number) {
      this.teamIds = this.teamIds.filter((item) => item !== id);
    },
    clear() {
      this.teamIds = [];
    },
  },
});
