export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Artist: {
        Row: {
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      ArtistProfileImage: {
        Row: {
          artistId: string
          copyrightId: string | null
          createdAt: string
          id: string
          imageURL: string
        }
        Insert: {
          artistId: string
          copyrightId?: string | null
          createdAt?: string
          id: string
          imageURL: string
        }
        Update: {
          artistId?: string
          copyrightId?: string | null
          createdAt?: string
          id?: string
          imageURL?: string
        }
        Relationships: [
          {
            foreignKeyName: "ArtistProfileImage_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArtistProfileImage_copyrightId_fkey"
            columns: ["copyrightId"]
            isOneToOne: false
            referencedRelation: "Copyright"
            referencedColumns: ["id"]
          },
        ]
      }
      AuthToken: {
        Row: {
          access_token: string
          created_at: string
          id: string
          refresh_token: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          id: string
          refresh_token: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          id?: string
          refresh_token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "AuthToken_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      bundles: {
        Row: {
          enabled: boolean
          file_hash: string
          file_url: string
          git_commit_hash: string | null
          id: string
          message: string | null
          platform: Database["public"]["Enums"]["platforms"]
          should_force_update: boolean
          target_app_version: string
        }
        Insert: {
          enabled: boolean
          file_hash: string
          file_url: string
          git_commit_hash?: string | null
          id: string
          message?: string | null
          platform: Database["public"]["Enums"]["platforms"]
          should_force_update: boolean
          target_app_version: string
        }
        Update: {
          enabled?: boolean
          file_hash?: string
          file_url?: string
          git_commit_hash?: string | null
          id?: string
          message?: string | null
          platform?: Database["public"]["Enums"]["platforms"]
          should_force_update?: boolean
          target_app_version?: string
        }
        Relationships: []
      }
      Concert: {
        Row: {
          createdAt: string
          date: string
          deletedAt: string | null
          eventCategoryId: string | null
          id: string
          isKOPIS: boolean
          locationCityId: string | null
          slug: string | null
          title: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          date: string
          deletedAt?: string | null
          eventCategoryId?: string | null
          id?: string
          isKOPIS?: boolean
          locationCityId?: string | null
          slug?: string | null
          title: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          date?: string
          deletedAt?: string | null
          eventCategoryId?: string | null
          id?: string
          isKOPIS?: boolean
          locationCityId?: string | null
          slug?: string | null
          title?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Concert_eventCategoryId_fkey"
            columns: ["eventCategoryId"]
            isOneToOne: false
            referencedRelation: "EventCategory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Concert_locationCityId_fkey"
            columns: ["locationCityId"]
            isOneToOne: false
            referencedRelation: "LocationCity"
            referencedColumns: ["id"]
          },
        ]
      }
      ConcertsOnArtists: {
        Row: {
          artistId: string
          concertId: string
          createdAt: string
        }
        Insert: {
          artistId: string
          concertId: string
          createdAt?: string
        }
        Update: {
          artistId?: string
          concertId?: string
          createdAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "ConcertsOnArtists_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ConcertsOnArtists_concertId_fkey"
            columns: ["concertId"]
            isOneToOne: false
            referencedRelation: "Concert"
            referencedColumns: ["id"]
          },
        ]
      }
      ConcertsOnPosters: {
        Row: {
          concertId: string
          createdAt: string
          posterId: string
        }
        Insert: {
          concertId: string
          createdAt?: string
          posterId: string
        }
        Update: {
          concertId?: string
          createdAt?: string
          posterId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ConcertsOnPosters_concertId_fkey"
            columns: ["concertId"]
            isOneToOne: false
            referencedRelation: "Concert"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ConcertsOnPosters_posterId_fkey"
            columns: ["posterId"]
            isOneToOne: false
            referencedRelation: "Poster"
            referencedColumns: ["id"]
          },
        ]
      }
      ConcertsOnTickets: {
        Row: {
          concertId: string
          createdAt: string
          ticketId: string
        }
        Insert: {
          concertId: string
          createdAt?: string
          ticketId: string
        }
        Update: {
          concertId?: string
          createdAt?: string
          ticketId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ConcertsOnTickets_concertId_fkey"
            columns: ["concertId"]
            isOneToOne: false
            referencedRelation: "Concert"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ConcertsOnTickets_ticketId_fkey"
            columns: ["ticketId"]
            isOneToOne: false
            referencedRelation: "Ticket"
            referencedColumns: ["id"]
          },
        ]
      }
      ConcertsOnVenues: {
        Row: {
          concertId: string
          createdAt: string
          venueId: string
        }
        Insert: {
          concertId: string
          createdAt?: string
          venueId: string
        }
        Update: {
          concertId?: string
          createdAt?: string
          venueId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ConcertsOnVenues_concertId_fkey"
            columns: ["concertId"]
            isOneToOne: false
            referencedRelation: "Concert"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ConcertsOnVenues_venueId_fkey"
            columns: ["venueId"]
            isOneToOne: false
            referencedRelation: "Venue"
            referencedColumns: ["id"]
          },
        ]
      }
      Copyright: {
        Row: {
          createdAt: string
          id: string
          license: string
          licenseURL: string
          owner: string
        }
        Insert: {
          createdAt?: string
          id: string
          license: string
          licenseURL: string
          owner: string
        }
        Update: {
          createdAt?: string
          id?: string
          license?: string
          licenseURL?: string
          owner?: string
        }
        Relationships: []
      }
      EmailAuthRequest: {
        Row: {
          authcode: string
          authenticated: boolean
          authenticatedAt: string | null
          createdAt: string
          email: string
          id: string
        }
        Insert: {
          authcode: string
          authenticated?: boolean
          authenticatedAt?: string | null
          createdAt?: string
          email: string
          id: string
        }
        Update: {
          authcode?: string
          authenticated?: boolean
          authenticatedAt?: string | null
          createdAt?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      Event: {
        Row: {
          createdAt: string
          id: number
          promoterId: number | null
        }
        Insert: {
          createdAt?: string
          id?: number
          promoterId?: number | null
        }
        Update: {
          createdAt?: string
          id?: number
          promoterId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Event_promoterId_fkey"
            columns: ["promoterId"]
            isOneToOne: false
            referencedRelation: "Promoter"
            referencedColumns: ["id"]
          },
        ]
      }
      EventCategory: {
        Row: {
          deletedAt: string | null
          id: string
          name: string
          serialNumber: number
        }
        Insert: {
          deletedAt?: string | null
          id: string
          name: string
          serialNumber: number
        }
        Update: {
          deletedAt?: string | null
          id?: string
          name?: string
          serialNumber?: number
        }
        Relationships: []
      }
      FCMToken: {
        Row: {
          createdAt: string
          id: string
          tokenValue: string
        }
        Insert: {
          createdAt?: string
          id: string
          tokenValue: string
        }
        Update: {
          createdAt?: string
          id?: string
          tokenValue?: string
        }
        Relationships: []
      }
      KOPISEvent: {
        Row: {
          concertId: string
          createdAt: string
          id: string
        }
        Insert: {
          concertId: string
          createdAt?: string
          id: string
        }
        Update: {
          concertId?: string
          createdAt?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "KOPISEvent_concertId_fkey"
            columns: ["concertId"]
            isOneToOne: false
            referencedRelation: "Concert"
            referencedColumns: ["id"]
          },
        ]
      }
      LocationCitiesOnLocationCountries: {
        Row: {
          createdAt: string
          locationCityId: string
          locationCountryId: string
        }
        Insert: {
          createdAt?: string
          locationCityId: string
          locationCountryId: string
        }
        Update: {
          createdAt?: string
          locationCityId?: string
          locationCountryId?: string
        }
        Relationships: [
          {
            foreignKeyName: "LocationCitiesOnLocationCountries_locationCityId_fkey"
            columns: ["locationCityId"]
            isOneToOne: false
            referencedRelation: "LocationCity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "LocationCitiesOnLocationCountries_locationCountryId_fkey"
            columns: ["locationCountryId"]
            isOneToOne: false
            referencedRelation: "LocationCountry"
            referencedColumns: ["id"]
          },
        ]
      }
      LocationCity: {
        Row: {
          createdAt: string
          disabled: boolean
          geohash: string | null
          id: string
          lat: number
          lng: number
          name: string
          serialNumber: number | null
          uiName: string
        }
        Insert: {
          createdAt?: string
          disabled?: boolean
          geohash?: string | null
          id: string
          lat: number
          lng: number
          name: string
          serialNumber?: number | null
          uiName: string
        }
        Update: {
          createdAt?: string
          disabled?: boolean
          geohash?: string | null
          id?: string
          lat?: number
          lng?: number
          name?: string
          serialNumber?: number | null
          uiName?: string
        }
        Relationships: []
      }
      LocationCountry: {
        Row: {
          createdAt: string
          id: string
          lat: number | null
          lng: number | null
          name: string
          uiName: string
        }
        Insert: {
          createdAt?: string
          id: string
          lat?: number | null
          lng?: number | null
          name: string
          uiName: string
        }
        Update: {
          createdAt?: string
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          uiName?: string
        }
        Relationships: []
      }
      Poster: {
        Row: {
          copyrightId: string | null
          createdAt: string
          id: string
          imageURL: string
        }
        Insert: {
          copyrightId?: string | null
          createdAt?: string
          id?: string
          imageURL: string
        }
        Update: {
          copyrightId?: string | null
          createdAt?: string
          id?: string
          imageURL?: string
        }
        Relationships: [
          {
            foreignKeyName: "Poster_copyrightId_fkey"
            columns: ["copyrightId"]
            isOneToOne: false
            referencedRelation: "Copyright"
            referencedColumns: ["id"]
          },
        ]
      }
      Price: {
        Row: {
          createdAt: string
          id: string
          price: number
          priceCurrency: string
          title: string
        }
        Insert: {
          createdAt?: string
          id: string
          price: number
          priceCurrency: string
          title: string
        }
        Update: {
          createdAt?: string
          id?: string
          price?: number
          priceCurrency?: string
          title?: string
        }
        Relationships: []
      }
      Promoter: {
        Row: {
          createdAt: string
          id: number
        }
        Insert: {
          createdAt?: string
          id?: number
        }
        Update: {
          createdAt?: string
          id?: number
        }
        Relationships: []
      }
      Staff: {
        Row: {
          created_at: string
          id: string
          isAuthorized: boolean
        }
        Insert: {
          created_at?: string
          id: string
          isAuthorized?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          isAuthorized?: boolean
        }
        Relationships: []
      }
      Ticket: {
        Row: {
          createdAt: string
          id: string
          openDate: string
          seller: string
          sellingURL: string
        }
        Insert: {
          createdAt?: string
          id?: string
          openDate: string
          seller: string
          sellingURL: string
        }
        Update: {
          createdAt?: string
          id?: string
          openDate?: string
          seller?: string
          sellingURL?: string
        }
        Relationships: []
      }
      TicketsOnPrices: {
        Row: {
          createdAt: string
          priceId: string
          ticketId: string
        }
        Insert: {
          createdAt?: string
          priceId: string
          ticketId: string
        }
        Update: {
          createdAt?: string
          priceId?: string
          ticketId?: string
        }
        Relationships: [
          {
            foreignKeyName: "TicketsOnPrices_priceId_fkey"
            columns: ["priceId"]
            isOneToOne: false
            referencedRelation: "Price"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TicketsOnPrices_ticketId_fkey"
            columns: ["ticketId"]
            isOneToOne: false
            referencedRelation: "Ticket"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          deactivatedAt: string | null
          email: string
          id: string
          password: string | null
          passwordSalt: string | null
          provider: string
        }
        Insert: {
          createdAt?: string
          deactivatedAt?: string | null
          email: string
          id: string
          password?: string | null
          passwordSalt?: string | null
          provider: string
        }
        Update: {
          createdAt?: string
          deactivatedAt?: string | null
          email?: string
          id?: string
          password?: string | null
          passwordSalt?: string | null
          provider?: string
        }
        Relationships: []
      }
      UsersOnFCMTokens: {
        Row: {
          createdAt: string
          fcmTokenId: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          fcmTokenId: string
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          fcmTokenId?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UsersOnFCMTokens_fcmTokenId_fkey"
            columns: ["fcmTokenId"]
            isOneToOne: false
            referencedRelation: "FCMToken"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UsersOnFCMTokens_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      UsersOnStaffs: {
        Row: {
          createdAt: string
          staffId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          staffId: string
          userId: string
        }
        Update: {
          createdAt?: string
          staffId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UsersOnStaffs_staffId_fkey"
            columns: ["staffId"]
            isOneToOne: false
            referencedRelation: "Staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UsersOnStaffs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      UsersOnSubscribedArtists: {
        Row: {
          artistId: string
          createdAt: string
          userId: string
        }
        Insert: {
          artistId: string
          createdAt?: string
          userId: string
        }
        Update: {
          artistId?: string
          createdAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UsersOnSubscribedArtists_artistId_fkey"
            columns: ["artistId"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UsersOnSubscribedArtists_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      UsersOnSubscribedConcerts: {
        Row: {
          concertId: string
          createdAt: string
          userId: string
        }
        Insert: {
          concertId: string
          createdAt?: string
          userId: string
        }
        Update: {
          concertId?: string
          createdAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UsersOnSubscribedConcerts_concertId_fkey"
            columns: ["concertId"]
            isOneToOne: false
            referencedRelation: "Concert"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UsersOnSubscribedConcerts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      UsersOnSubscribedVenues: {
        Row: {
          createdAt: string
          userId: string
          venueId: string
        }
        Insert: {
          createdAt?: string
          userId: string
          venueId: string
        }
        Update: {
          createdAt?: string
          userId?: string
          venueId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UsersOnSubscribedVenues_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UsersOnSubscribedVenues_venueId_fkey"
            columns: ["venueId"]
            isOneToOne: false
            referencedRelation: "Venue"
            referencedColumns: ["id"]
          },
        ]
      }
      Venue: {
        Row: {
          address: string
          createdAt: string
          geohash: string
          id: string
          lat: number
          lng: number
          name: string
        }
        Insert: {
          address: string
          createdAt?: string
          geohash: string
          id?: string
          lat: number
          lng: number
          name: string
        }
        Update: {
          address?: string
          createdAt?: string
          geohash?: string
          id?: string
          lat?: number
          lng?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_update_info: {
        Args: {
          app_platform: Database["public"]["Enums"]["platforms"]
          app_version: string
          bundle_id: string
        }
        Returns: {
          id: string
          should_force_update: boolean
          file_url: string
          file_hash: string
          status: string
        }[]
      }
      semver_satisfies: {
        Args: {
          range_expression: string
          version: string
        }
        Returns: boolean
      }
    }
    Enums: {
      platforms: "ios" | "android"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
