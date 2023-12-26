interface Profile {
  correct: number;
  wrong: number;
  accuracy: number;
}

const initialProfile: Profile = {
  correct: 0,
  wrong: 0,
  accuracy: 0,
};

export { initialProfile };
export type { Profile };
