export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  public: {
    Tables: {
      Artist: {
        Row: {
          createdAt: string;
          id: string;
          name: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          name: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      ArtistProfileImage: {
        Row: {
          artistId: string;
          copyrightId: string | null;
          createdAt: string;
          id: string;
          imageURL: string;
        };
        Insert: {
          artistId: string;
          copyrightId?: string | null;
          createdAt?: string;
          id: string;
          imageURL: string;
        };
        Update: {
          artistId?: string;
          copyrightId?: string | null;
          createdAt?: string;
          id?: string;
          imageURL?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ArtistProfileImage_artistId_fkey';
            columns: ['artistId'];
            isOneToOne: false;
            referencedRelation: 'Artist';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ArtistProfileImage_copyrightId_fkey';
            columns: ['copyrightId'];
            isOneToOne: false;
            referencedRelation: 'Copyright';
            referencedColumns: ['id'];
          },
        ];
      };
      AuthToken: {
        Row: {
          access_token: string;
          created_at: string;
          id: string;
          refresh_token: string;
          user_id: string;
        };
        Insert: {
          access_token: string;
          created_at?: string;
          id: string;
          refresh_token: string;
          user_id: string;
        };
        Update: {
          access_token?: string;
          created_at?: string;
          id?: string;
          refresh_token?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'AuthToken_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      bundles: {
        Row: {
          enabled: boolean;
          file_hash: string;
          file_url: string;
          git_commit_hash: string | null;
          id: string;
          message: string | null;
          platform: Database['public']['Enums']['platforms'];
          should_force_update: boolean;
          target_app_version: string;
        };
        Insert: {
          enabled: boolean;
          file_hash: string;
          file_url: string;
          git_commit_hash?: string | null;
          id: string;
          message?: string | null;
          platform: Database['public']['Enums']['platforms'];
          should_force_update: boolean;
          target_app_version: string;
        };
        Update: {
          enabled?: boolean;
          file_hash?: string;
          file_url?: string;
          git_commit_hash?: string | null;
          id?: string;
          message?: string | null;
          platform?: Database['public']['Enums']['platforms'];
          should_force_update?: boolean;
          target_app_version?: string;
        };
        Relationships: [];
      };
      Concert: {
        Row: {
          createdAt: string;
          date: string;
          deletedAt: string | null;
          eventCategoryId: string | null;
          id: string;
          isKOPIS: boolean;
          locationCityId: string | null;
          slug: string | null;
          title: string;
          updatedAt: string | null;
        };
        Insert: {
          createdAt?: string;
          date: string;
          deletedAt?: string | null;
          eventCategoryId?: string | null;
          id: string;
          isKOPIS?: boolean;
          locationCityId?: string | null;
          slug?: string | null;
          title: string;
          updatedAt?: string | null;
        };
        Update: {
          createdAt?: string;
          date?: string;
          deletedAt?: string | null;
          eventCategoryId?: string | null;
          id?: string;
          isKOPIS?: boolean;
          locationCityId?: string | null;
          slug?: string | null;
          title?: string;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Concert_eventCategoryId_fkey';
            columns: ['eventCategoryId'];
            isOneToOne: false;
            referencedRelation: 'EventCategory';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Concert_locationCityId_fkey';
            columns: ['locationCityId'];
            isOneToOne: false;
            referencedRelation: 'LocationCity';
            referencedColumns: ['id'];
          },
        ];
      };
      ConcertsOnArtists: {
        Row: {
          artistId: string;
          concertId: string;
          createdAt: string;
        };
        Insert: {
          artistId: string;
          concertId: string;
          createdAt?: string;
        };
        Update: {
          artistId?: string;
          concertId?: string;
          createdAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ConcertsOnArtists_artistId_fkey';
            columns: ['artistId'];
            isOneToOne: false;
            referencedRelation: 'Artist';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ConcertsOnArtists_concertId_fkey';
            columns: ['concertId'];
            isOneToOne: false;
            referencedRelation: 'Concert';
            referencedColumns: ['id'];
          },
        ];
      };
      ConcertsOnDetailImages: {
        Row: {
          concertId: string;
          createdAt: string;
          detailImageId: string;
        };
        Insert: {
          concertId: string;
          createdAt?: string;
          detailImageId: string;
        };
        Update: {
          concertId?: string;
          createdAt?: string;
          detailImageId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ConcertsOnDetailImages_concertId_fkey';
            columns: ['concertId'];
            isOneToOne: false;
            referencedRelation: 'Concert';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ConcertsOnDetailImages_detailImageId_fkey';
            columns: ['detailImageId'];
            isOneToOne: false;
            referencedRelation: 'DetailImage';
            referencedColumns: ['id'];
          },
        ];
      };
      ConcertsOnPosters: {
        Row: {
          concertId: string;
          createdAt: string;
          posterId: string;
        };
        Insert: {
          concertId: string;
          createdAt?: string;
          posterId: string;
        };
        Update: {
          concertId?: string;
          createdAt?: string;
          posterId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ConcertsOnPosters_concertId_fkey';
            columns: ['concertId'];
            isOneToOne: false;
            referencedRelation: 'Concert';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ConcertsOnPosters_posterId_fkey';
            columns: ['posterId'];
            isOneToOne: false;
            referencedRelation: 'Poster';
            referencedColumns: ['id'];
          },
        ];
      };
      ConcertsOnTickets: {
        Row: {
          concertId: string;
          createdAt: string;
          ticketId: string;
        };
        Insert: {
          concertId: string;
          createdAt?: string;
          ticketId: string;
        };
        Update: {
          concertId?: string;
          createdAt?: string;
          ticketId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ConcertsOnTickets_concertId_fkey';
            columns: ['concertId'];
            isOneToOne: false;
            referencedRelation: 'Concert';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ConcertsOnTickets_ticketId_fkey';
            columns: ['ticketId'];
            isOneToOne: false;
            referencedRelation: 'Ticket';
            referencedColumns: ['id'];
          },
        ];
      };
      ConcertsOnVenues: {
        Row: {
          concertId: string;
          createdAt: string;
          venueId: string;
        };
        Insert: {
          concertId: string;
          createdAt?: string;
          venueId: string;
        };
        Update: {
          concertId?: string;
          createdAt?: string;
          venueId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ConcertsOnVenues_concertId_fkey';
            columns: ['concertId'];
            isOneToOne: false;
            referencedRelation: 'Concert';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ConcertsOnVenues_venueId_fkey';
            columns: ['venueId'];
            isOneToOne: false;
            referencedRelation: 'Venue';
            referencedColumns: ['id'];
          },
        ];
      };
      Copyright: {
        Row: {
          createdAt: string;
          id: string;
          license: string;
          licenseURL: string;
          owner: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          license: string;
          licenseURL: string;
          owner: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          license?: string;
          licenseURL?: string;
          owner?: string;
        };
        Relationships: [];
      };
      DetailImage: {
        Row: {
          createdAt: string;
          id: string;
          imageURL: string;
          keyId: string | null;
        };
        Insert: {
          createdAt?: string;
          id: string;
          imageURL: string;
          keyId?: string | null;
        };
        Update: {
          createdAt?: string;
          id?: string;
          imageURL?: string;
          keyId?: string | null;
        };
        Relationships: [];
      };
      EmailAuthRequest: {
        Row: {
          authcode: string;
          authenticated: boolean;
          authenticatedAt: string | null;
          createdAt: string;
          email: string;
          id: string;
        };
        Insert: {
          authcode: string;
          authenticated?: boolean;
          authenticatedAt?: string | null;
          createdAt?: string;
          email: string;
          id: string;
        };
        Update: {
          authcode?: string;
          authenticated?: boolean;
          authenticatedAt?: string | null;
          createdAt?: string;
          email?: string;
          id?: string;
        };
        Relationships: [];
      };
      Event: {
        Row: {
          createdAt: string;
          id: number;
          promoterId: number | null;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          promoterId?: number | null;
        };
        Update: {
          createdAt?: string;
          id?: number;
          promoterId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Event_promoterId_fkey';
            columns: ['promoterId'];
            isOneToOne: false;
            referencedRelation: 'Promoter';
            referencedColumns: ['id'];
          },
        ];
      };
      EventCategory: {
        Row: {
          deletedAt: string | null;
          id: string;
          name: string;
          serialNumber: number;
        };
        Insert: {
          deletedAt?: string | null;
          id: string;
          name: string;
          serialNumber: number;
        };
        Update: {
          deletedAt?: string | null;
          id?: string;
          name?: string;
          serialNumber?: number;
        };
        Relationships: [];
      };
      FCMToken: {
        Row: {
          createdAt: string;
          id: string;
          tokenValue: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          tokenValue: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          tokenValue?: string;
        };
        Relationships: [];
      };
      KOPISEvent: {
        Row: {
          concertId: string;
          createdAt: string;
          id: string;
        };
        Insert: {
          concertId: string;
          createdAt?: string;
          id: string;
        };
        Update: {
          concertId?: string;
          createdAt?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'KOPISEvent_concertId_fkey';
            columns: ['concertId'];
            isOneToOne: false;
            referencedRelation: 'Concert';
            referencedColumns: ['id'];
          },
        ];
      };
      LocationCitiesOnLocationCountries: {
        Row: {
          createdAt: string;
          locationCityId: string;
          locationCountryId: string;
        };
        Insert: {
          createdAt?: string;
          locationCityId: string;
          locationCountryId: string;
        };
        Update: {
          createdAt?: string;
          locationCityId?: string;
          locationCountryId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'LocationCitiesOnLocationCountries_locationCityId_fkey';
            columns: ['locationCityId'];
            isOneToOne: false;
            referencedRelation: 'LocationCity';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'LocationCitiesOnLocationCountries_locationCountryId_fkey';
            columns: ['locationCountryId'];
            isOneToOne: false;
            referencedRelation: 'LocationCountry';
            referencedColumns: ['id'];
          },
        ];
      };
      LocationCity: {
        Row: {
          createdAt: string;
          disabled: boolean;
          geohash: string | null;
          id: string;
          lat: number;
          lng: number;
          name: string;
          serialNumber: number | null;
          uiName: string;
        };
        Insert: {
          createdAt?: string;
          disabled?: boolean;
          geohash?: string | null;
          id: string;
          lat: number;
          lng: number;
          name: string;
          serialNumber?: number | null;
          uiName: string;
        };
        Update: {
          createdAt?: string;
          disabled?: boolean;
          geohash?: string | null;
          id?: string;
          lat?: number;
          lng?: number;
          name?: string;
          serialNumber?: number | null;
          uiName?: string;
        };
        Relationships: [];
      };
      LocationCountry: {
        Row: {
          createdAt: string;
          id: string;
          lat: number | null;
          lng: number | null;
          name: string;
          uiName: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          lat?: number | null;
          lng?: number | null;
          name: string;
          uiName: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          name?: string;
          uiName?: string;
        };
        Relationships: [];
      };
      Poster: {
        Row: {
          copyrightId: string | null;
          createdAt: string;
          id: string;
          imageURL: string | null;
          keyId: string | null;
        };
        Insert: {
          copyrightId?: string | null;
          createdAt?: string;
          id: string;
          imageURL?: string | null;
          keyId?: string | null;
        };
        Update: {
          copyrightId?: string | null;
          createdAt?: string;
          id?: string;
          imageURL?: string | null;
          keyId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Poster_copyrightId_fkey';
            columns: ['copyrightId'];
            isOneToOne: false;
            referencedRelation: 'Copyright';
            referencedColumns: ['id'];
          },
        ];
      };
      Price: {
        Row: {
          createdAt: string;
          id: string;
          price: number;
          priceCurrency: string;
          title: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          price: number;
          priceCurrency: string;
          title: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          price?: number;
          priceCurrency?: string;
          title?: string;
        };
        Relationships: [];
      };
      Promoter: {
        Row: {
          createdAt: string;
          id: number;
        };
        Insert: {
          createdAt?: string;
          id?: number;
        };
        Update: {
          createdAt?: string;
          id?: number;
        };
        Relationships: [];
      };
      Staff: {
        Row: {
          created_at: string;
          id: string;
          isAuthorized: boolean;
        };
        Insert: {
          created_at?: string;
          id: string;
          isAuthorized?: boolean;
        };
        Update: {
          created_at?: string;
          id?: string;
          isAuthorized?: boolean;
        };
        Relationships: [];
      };
      Ticket: {
        Row: {
          createdAt: string;
          id: string;
          openDate: string;
          seller: string;
          sellingURL: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          openDate: string;
          seller: string;
          sellingURL: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          openDate?: string;
          seller?: string;
          sellingURL?: string;
        };
        Relationships: [];
      };
      TicketsOnPrices: {
        Row: {
          createdAt: string;
          priceId: string;
          ticketId: string;
        };
        Insert: {
          createdAt?: string;
          priceId: string;
          ticketId: string;
        };
        Update: {
          createdAt?: string;
          priceId?: string;
          ticketId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'TicketsOnPrices_priceId_fkey';
            columns: ['priceId'];
            isOneToOne: false;
            referencedRelation: 'Price';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TicketsOnPrices_ticketId_fkey';
            columns: ['ticketId'];
            isOneToOne: false;
            referencedRelation: 'Ticket';
            referencedColumns: ['id'];
          },
        ];
      };
      User: {
        Row: {
          createdAt: string;
          deactivatedAt: string | null;
          email: string;
          handle: string | null;
          id: string;
          password: string | null;
          passwordSalt: string | null;
          provider: string;
        };
        Insert: {
          createdAt?: string;
          deactivatedAt?: string | null;
          email: string;
          handle?: string | null;
          id: string;
          password?: string | null;
          passwordSalt?: string | null;
          provider: string;
        };
        Update: {
          createdAt?: string;
          deactivatedAt?: string | null;
          email?: string;
          handle?: string | null;
          id?: string;
          password?: string | null;
          passwordSalt?: string | null;
          provider?: string;
        };
        Relationships: [];
      };
      UsersOnFCMTokens: {
        Row: {
          createdAt: string;
          fcmTokenId: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          fcmTokenId: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          fcmTokenId?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UsersOnFCMTokens_fcmTokenId_fkey';
            columns: ['fcmTokenId'];
            isOneToOne: false;
            referencedRelation: 'FCMToken';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UsersOnFCMTokens_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      UsersOnStaffs: {
        Row: {
          createdAt: string;
          staffId: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          staffId: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          staffId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UsersOnStaffs_staffId_fkey';
            columns: ['staffId'];
            isOneToOne: false;
            referencedRelation: 'Staff';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UsersOnStaffs_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      UsersOnSubscribedArtists: {
        Row: {
          artistId: string;
          createdAt: string;
          userId: string;
        };
        Insert: {
          artistId: string;
          createdAt?: string;
          userId: string;
        };
        Update: {
          artistId?: string;
          createdAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UsersOnSubscribedArtists_artistId_fkey';
            columns: ['artistId'];
            isOneToOne: false;
            referencedRelation: 'Artist';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UsersOnSubscribedArtists_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      UsersOnSubscribedConcerts: {
        Row: {
          concertId: string;
          createdAt: string;
          userId: string;
        };
        Insert: {
          concertId: string;
          createdAt?: string;
          userId: string;
        };
        Update: {
          concertId?: string;
          createdAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UsersOnSubscribedConcerts_concertId_fkey';
            columns: ['concertId'];
            isOneToOne: false;
            referencedRelation: 'Concert';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UsersOnSubscribedConcerts_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      UsersOnSubscribedVenues: {
        Row: {
          createdAt: string;
          userId: string;
          venueId: string;
        };
        Insert: {
          createdAt?: string;
          userId: string;
          venueId: string;
        };
        Update: {
          createdAt?: string;
          userId?: string;
          venueId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UsersOnSubscribedVenues_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UsersOnSubscribedVenues_venueId_fkey';
            columns: ['venueId'];
            isOneToOne: false;
            referencedRelation: 'Venue';
            referencedColumns: ['id'];
          },
        ];
      };
      Venue: {
        Row: {
          address: string;
          createdAt: string;
          geohash: string;
          id: string;
          lat: number;
          lng: number;
          name: string;
          slug: string | null;
        };
        Insert: {
          address: string;
          createdAt?: string;
          geohash: string;
          id: string;
          lat: number;
          lng: number;
          name: string;
          slug?: string | null;
        };
        Update: {
          address?: string;
          createdAt?: string;
          geohash?: string;
          id?: string;
          lat?: number;
          lng?: number;
          name?: string;
          slug?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_update_info: {
        Args: {
          app_platform: Database['public']['Enums']['platforms'];
          app_version: string;
          bundle_id: string;
        };
        Returns: {
          id: string;
          should_force_update: boolean;
          file_url: string;
          file_hash: string;
          status: string;
        }[];
      };
      semver_satisfies: {
        Args: { range_expression: string; version: string };
        Returns: boolean;
      };
    };
    Enums: {
      platforms: 'ios' | 'android';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      platforms: ['ios', 'android'],
    },
  },
} as const;
