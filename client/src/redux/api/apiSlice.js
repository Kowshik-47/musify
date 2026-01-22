// client/src/redux/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result?.error?.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    );
    
    if (refreshResult?.data) {
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Logout user
      api.dispatch({ type: 'auth/logout' });
    }
  }
  
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User', 'Track', 'Album', 'Artist', 'Playlist', 
    'Library', 'Search', 'Recommendations'
  ],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['User', 'Library']
    }),
    
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData
      })
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      invalidatesTags: ['User', 'Library']
    }),
    
    getMe: builder.query({
      query: () => '/users/me',
      providesTags: ['User']
    }),
    
    // Tracks
    getTrack: builder.query({
      query: (id) => `/tracks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Track', id }]
    }),
    
    getStreamUrl: builder.query({
      query: ({ trackId, quality }) => `/stream/${trackId}?quality=${quality}`
    }),
    
    // Albums
    getAlbum: builder.query({
      query: (id) => `/albums/${id}`,
      providesTags: (result, error, id) => [{ type: 'Album', id }]
    }),
    
    getAlbumTracks: builder.query({
      query: (id) => `/albums/${id}/tracks`,
      providesTags: (result, error, id) => [{ type: 'Album', id }]
    }),
    
    // Artists
    getArtist: builder.query({
      query: (id) => `/artists/${id}`,
      providesTags: (result, error, id) => [{ type: 'Artist', id }]
    }),
    
    getArtistTopTracks: builder.query({
      query: (id) => `/artists/${id}/top-tracks`
    }),
    
    getArtistAlbums: builder.query({
      query: ({ id, type = 'all', limit = 20, offset = 0 }) =>
        `/artists/${id}/albums?type=${type}&limit=${limit}&offset=${offset}`
    }),
    
    // Playlists
    getPlaylist: builder.query({
      query: (id) => `/playlists/${id}`,
      providesTags: (result, error, id) => [{ type: 'Playlist', id }]
    }),
    
    createPlaylist: builder.mutation({
      query: (data) => ({
        url: '/playlists',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Library']
    }),
    
    updatePlaylist: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/playlists/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Playlist', id }]
    }),
    
    addTracksToPlaylist: builder.mutation({
      query: ({ playlistId, trackIds }) => ({
        url: `/playlists/${playlistId}/tracks`,
        method: 'POST',
        body: { trackIds }
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: 'Playlist', id: playlistId }
      ]
    }),
    
    removeTracksFromPlaylist: builder.mutation({
      query: ({ playlistId, trackIds }) => ({
        url: `/playlists/${playlistId}/tracks`,
        method: 'DELETE',
        body: { trackIds }
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: 'Playlist', id: playlistId }
      ]
    }),
    
    // Library
    getLibrary: builder.query({
      query: ({ type = 'all', limit = 50, offset = 0 }) =>
        `/library?type=${type}&limit=${limit}&offset=${offset}`,
      providesTags: ['Library']
    }),
    
    saveToLibrary: builder.mutation({
      query: ({ type, id }) => ({
        url: `/library/${type}/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Library']
    }),
    
    removeFromLibrary: builder.mutation({
      query: ({ type, id }) => ({
        url: `/library/${type}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Library']
    }),
    
    checkSaved: builder.query({
      query: ({ type, ids }) => `/library/${type}/contains?ids=${ids.join(',')}`
    }),
    
    // Search
    search: builder.query({
      query: ({ q, type = 'all', limit = 20, offset = 0 }) =>
        `/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}&offset=${offset}`,
      providesTags: ['Search']
    }),
    
    // Browse
    getFeaturedPlaylists: builder.query({
      query: () => '/browse/featured-playlists'
    }),
    
    getNewReleases: builder.query({
      query: ({ limit = 20, offset = 0 }) =>
        `/browse/new-releases?limit=${limit}&offset=${offset}`
    }),
    
    getCategories: builder.query({
      query: () => '/browse/categories'
    }),
    
    getCategoryPlaylists: builder.query({
      query: (categoryId) => `/browse/categories/${categoryId}/playlists`
    }),
    
    // Recommendations
    getRecommendations: builder.query({
      query: ({ seedTracks, seedArtists, seedGenres, limit = 20 }) => {
        const params = new URLSearchParams();
        if (seedTracks?.length) params.append('seed_tracks', seedTracks.join(','));
        if (seedArtists?.length) params.append('seed_artists', seedArtists.join(','));
        if (seedGenres?.length) params.append('seed_genres', seedGenres.join(','));
        params.append('limit', limit);
        return `/recommendations?${params.toString()}`;
      },
      providesTags: ['Recommendations']
    }),
    
    // User actions
    followUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/follow`,
        method: 'PUT'
      })
    }),
    
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/follow`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
  useGetTrackQuery,
  useGetStreamUrlQuery,
  useGetAlbumQuery,
  useGetAlbumTracksQuery,
  useGetArtistQuery,
  useGetArtistTopTracksQuery,
  useGetArtistAlbumsQuery,
  useGetPlaylistQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useAddTracksToPlaylistMutation,
  useRemoveTracksFromPlaylistMutation,
  useGetLibraryQuery,
  useSaveToLibraryMutation,
  useRemoveFromLibraryMutation,
  useCheckSavedQuery,
  useSearchQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewReleasesQuery,
  useGetCategoriesQuery,
  useGetCategoryPlaylistsQuery,
  useGetRecommendationsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation
} = api;