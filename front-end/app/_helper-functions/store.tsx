import { create } from 'zustand'
import { UserType } from './types'

export const useUserStore = create<UserType>(() => ({
  token: null,
  refresh_token: null,
  resource_owner: null,
  //logOutUser: () => set(() => {user: null})
}))

export function userData(data: UserType) {
  useUserStore.setState((prevState) => ({
    ...prevState,
    token: data.token,
    refresh_token: data.refresh_token,
    resource_owner: {
      ...prevState.resource_owner,
      created_at: data.resource_owner?.created_at,
      email: data.resource_owner?.email,
      id: data.resource_owner?.id,
      updated_at: data.resource_owner?.updated_at,
    },
  }));
}