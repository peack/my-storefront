import { Product, User } from '@/payload-types'

export const getMyFavorites = async () => {
  let favorites: Product[] = []
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await req.json().then((data) => {
      const user = data.user as User
      if (!user) return
      favorites = user.favorites as Product[]
    })
  } catch (err) {
    console.log(err)
  }
  return favorites
}

export const toggleFavorite = async (favorite: Product, isFavorite: boolean) => {
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await req.json().then((data) => {
      if (!data.user) return
      let newFavorites: Product[] = []
      const currentFavorites: Product[] = data.user.favorites ?? []
      if (isFavorite) {
        newFavorites = currentFavorites.filter((f) => f.id !== favorite.id)
        setNewUserFavorites(data.user, newFavorites)
      } else {
        newFavorites = [...currentFavorites, favorite]
        const favoritesSet = new Set(newFavorites)
        newFavorites = [...favoritesSet]
        setNewUserFavorites(data.user, newFavorites)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function setNewUserFavorites(user: User, newFavorites: Product[]) {
  const favoriteIdArray = newFavorites.map((favorite) => favorite.id)
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorites: favoriteIdArray,
      }),
    })
    const data = await req.json()
  } catch (err) {
    console.log(err)
  }
}
