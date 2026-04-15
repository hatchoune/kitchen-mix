--
-- PostgreSQL database dump
--

\restrict qpBlxFI6KvyGaxzw6JW6PUt3wHwZPng1tCNpfRdyJPIYw8YqYkOurqczdVsa9yO

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: create_profile_on_signup(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_profile_on_signup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
    INSERT INTO public.profils (id, pseudo)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'pseudo', split_part(NEW.email, '@', 1))
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.create_profile_on_signup() OWNER TO postgres;

--
-- Name: delete_user_account(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_user_account() RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- 1. On anonymise les commentaires au lieu de les supprimer (pour garder la cohérence des discussions)
    UPDATE public.recipe_comments 
    SET content = '[Compte supprimé]', user_id = NULL 
    WHERE user_id = auth.uid();

    -- 2. On peut faire pareil pour les recettes ou les supprimer selon ton choix
    -- Ici on les laisse mais sans auteur
    UPDATE public.recettes 
    SET auteur_id = NULL 
    WHERE auteur_id = auth.uid();

    -- 3. On supprime le profil public
    DELETE FROM public.profils WHERE id = auth.uid();

    -- 4. On supprime l'utilisateur de la table Auth (La partie sensible)
    -- Le "SECURITY DEFINER" permet d'avoir les droits pour cette action
    DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;


ALTER FUNCTION public.delete_user_account() OWNER TO postgres;

--
-- Name: is_email_banned(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.is_email_banned(check_email text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM banned_users WHERE email = LOWER(TRIM(check_email))
  );
END;
$$;


ALTER FUNCTION public.is_email_banned(check_email text) OWNER TO postgres;

--
-- Name: recalculate_recipe_rating(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.recalculate_recipe_rating() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  UPDATE recettes SET
    note_moyenne = COALESCE(
      (SELECT ROUND(AVG(rating)::DECIMAL(3,2), 2) FROM recipe_ratings WHERE recette_id = COALESCE(NEW.recette_id, OLD.recette_id)),
      0
    ),
    nombre_notes = COALESCE(
      (SELECT COUNT(*) FROM recipe_ratings WHERE recette_id = COALESCE(NEW.recette_id, OLD.recette_id)),
      0
    ),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.recette_id, OLD.recette_id);
  RETURN COALESCE(NEW, OLD);
END;
$$;


ALTER FUNCTION public.recalculate_recipe_rating() OWNER TO postgres;

--
-- Name: rls_auto_enable(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rls_auto_enable() RETURNS event_trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION public.rls_auto_enable() OWNER TO postgres;

--
-- Name: update_planning_likes_count(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_planning_likes_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE user_plannings SET likes_count = likes_count + 1 WHERE id = NEW.planning_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE user_plannings SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.planning_id;
    RETURN OLD;
  END IF;
END;
$$;


ALTER FUNCTION public.update_planning_likes_count() OWNER TO postgres;

--
-- Name: update_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_
        -- Filter by action early - only get subscriptions interested in this action
        -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
        and (subs.action_filter = '*' or subs.action_filter = action::text);

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS TABLE(wal jsonb, is_rls_enabled boolean, subscription_ids uuid[], errors text[], slot_changes_count bigint)
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
  WITH pub AS (
    SELECT
      concat_ws(
        ',',
        CASE WHEN bool_or(pubinsert) THEN 'insert' ELSE NULL END,
        CASE WHEN bool_or(pubupdate) THEN 'update' ELSE NULL END,
        CASE WHEN bool_or(pubdelete) THEN 'delete' ELSE NULL END
      ) AS w2j_actions,
      coalesce(
        string_agg(
          realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
          ','
        ) filter (WHERE ppt.tablename IS NOT NULL AND ppt.tablename NOT LIKE '% %'),
        ''
      ) AS w2j_add_tables
    FROM pg_publication pp
    LEFT JOIN pg_publication_tables ppt ON pp.pubname = ppt.pubname
    WHERE pp.pubname = publication
    GROUP BY pp.pubname
    LIMIT 1
  ),
  -- MATERIALIZED ensures pg_logical_slot_get_changes is called exactly once
  w2j AS MATERIALIZED (
    SELECT x.*, pub.w2j_add_tables
    FROM pub,
         pg_logical_slot_get_changes(
           slot_name, null, max_changes,
           'include-pk', 'true',
           'include-transaction', 'false',
           'include-timestamp', 'true',
           'include-type-oids', 'true',
           'format-version', '2',
           'actions', pub.w2j_actions,
           'add-tables', pub.w2j_add_tables
         ) x
  ),
  -- Count raw slot entries before apply_rls/subscription filter
  slot_count AS (
    SELECT count(*)::bigint AS cnt
    FROM w2j
    WHERE w2j.w2j_add_tables <> ''
  ),
  -- Apply RLS and filter as before
  rls_filtered AS (
    SELECT xyz.wal, xyz.is_rls_enabled, xyz.subscription_ids, xyz.errors
    FROM w2j,
         realtime.apply_rls(
           wal := w2j.data::jsonb,
           max_record_bytes := max_record_bytes
         ) xyz(wal, is_rls_enabled, subscription_ids, errors)
    WHERE w2j.w2j_add_tables <> ''
      AND xyz.subscription_ids[1] IS NOT NULL
  )
  -- Real rows with slot count attached
  SELECT rf.wal, rf.is_rls_enabled, rf.subscription_ids, rf.errors, sc.cnt
  FROM rls_filtered rf, slot_count sc

  UNION ALL

  -- Sentinel row: always returned when no real rows exist so Elixir can
  -- always read slot_changes_count. Identified by wal IS NULL.
  SELECT null, null, null, null, sc.cnt
  FROM slot_count sc
  WHERE NOT EXISTS (SELECT 1 FROM rls_filtered)
$$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: allow_any_operation(text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.allow_any_operation(expected_operations text[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT CASE
      WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
      ELSE raw_operation
    END AS current_operation
    FROM current_operation
  )
  SELECT EXISTS (
    SELECT 1
    FROM normalized n
    CROSS JOIN LATERAL unnest(expected_operations) AS expected_operation
    WHERE expected_operation IS NOT NULL
      AND expected_operation <> ''
      AND n.current_operation = CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END
  );
$$;


ALTER FUNCTION storage.allow_any_operation(expected_operations text[]) OWNER TO supabase_storage_admin;

--
-- Name: allow_only_operation(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.allow_only_operation(expected_operation text) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT
      CASE
        WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
        ELSE raw_operation
      END AS current_operation,
      CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END AS requested_operation
    FROM current_operation
  )
  SELECT CASE
    WHEN requested_operation IS NULL OR requested_operation = '' THEN FALSE
    ELSE COALESCE(current_operation = requested_operation, FALSE)
  END
  FROM normalized;
$$;


ALTER FUNCTION storage.allow_only_operation(expected_operation text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


ALTER FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.protect_delete() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.custom_oauth_providers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_type text NOT NULL,
    identifier text NOT NULL,
    name text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    acceptable_client_ids text[] DEFAULT '{}'::text[] NOT NULL,
    scopes text[] DEFAULT '{}'::text[] NOT NULL,
    pkce_enabled boolean DEFAULT true NOT NULL,
    attribute_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    authorization_params jsonb DEFAULT '{}'::jsonb NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email_optional boolean DEFAULT false NOT NULL,
    issuer text,
    discovery_url text,
    skip_nonce_check boolean DEFAULT false NOT NULL,
    cached_discovery jsonb,
    discovery_cached_at timestamp with time zone,
    authorization_url text,
    token_url text,
    userinfo_url text,
    jwks_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT custom_oauth_providers_authorization_url_https CHECK (((authorization_url IS NULL) OR (authorization_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_authorization_url_length CHECK (((authorization_url IS NULL) OR (char_length(authorization_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_client_id_length CHECK (((char_length(client_id) >= 1) AND (char_length(client_id) <= 512))),
    CONSTRAINT custom_oauth_providers_discovery_url_length CHECK (((discovery_url IS NULL) OR (char_length(discovery_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_identifier_format CHECK ((identifier ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::text)),
    CONSTRAINT custom_oauth_providers_issuer_length CHECK (((issuer IS NULL) OR ((char_length(issuer) >= 1) AND (char_length(issuer) <= 2048)))),
    CONSTRAINT custom_oauth_providers_jwks_uri_https CHECK (((jwks_uri IS NULL) OR (jwks_uri ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_jwks_uri_length CHECK (((jwks_uri IS NULL) OR (char_length(jwks_uri) <= 2048))),
    CONSTRAINT custom_oauth_providers_name_length CHECK (((char_length(name) >= 1) AND (char_length(name) <= 100))),
    CONSTRAINT custom_oauth_providers_oauth2_requires_endpoints CHECK (((provider_type <> 'oauth2'::text) OR ((authorization_url IS NOT NULL) AND (token_url IS NOT NULL) AND (userinfo_url IS NOT NULL)))),
    CONSTRAINT custom_oauth_providers_oidc_discovery_url_https CHECK (((provider_type <> 'oidc'::text) OR (discovery_url IS NULL) OR (discovery_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_issuer_https CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NULL) OR (issuer ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_requires_issuer CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NOT NULL))),
    CONSTRAINT custom_oauth_providers_provider_type_check CHECK ((provider_type = ANY (ARRAY['oauth2'::text, 'oidc'::text]))),
    CONSTRAINT custom_oauth_providers_token_url_https CHECK (((token_url IS NULL) OR (token_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_token_url_length CHECK (((token_url IS NULL) OR (char_length(token_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_userinfo_url_https CHECK (((userinfo_url IS NULL) OR (userinfo_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_userinfo_url_length CHECK (((userinfo_url IS NULL) OR (char_length(userinfo_url) <= 2048)))
);


ALTER TABLE auth.custom_oauth_providers OWNER TO supabase_auth_admin;

--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE auth.oauth_client_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_challenges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    challenge_type text NOT NULL,
    session_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    CONSTRAINT webauthn_challenges_challenge_type_check CHECK ((challenge_type = ANY (ARRAY['signup'::text, 'registration'::text, 'authentication'::text])))
);


ALTER TABLE auth.webauthn_challenges OWNER TO supabase_auth_admin;

--
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    credential_id bytea NOT NULL,
    public_key bytea NOT NULL,
    attestation_type text DEFAULT ''::text NOT NULL,
    aaguid uuid,
    sign_count bigint DEFAULT 0 NOT NULL,
    transports jsonb DEFAULT '[]'::jsonb NOT NULL,
    backup_eligible boolean DEFAULT false NOT NULL,
    backed_up boolean DEFAULT false NOT NULL,
    friendly_name text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_used_at timestamp with time zone
);


ALTER TABLE auth.webauthn_credentials OWNER TO supabase_auth_admin;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: banned_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banned_users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    user_id uuid,
    reason text,
    banned_by uuid,
    banned_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.banned_users OWNER TO postgres;

--
-- Name: comment_votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment_votes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    comment_id uuid NOT NULL,
    vote_type text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT comment_votes_vote_type_check CHECK ((vote_type = ANY (ARRAY['like'::text, 'dislike'::text])))
);


ALTER TABLE public.comment_votes OWNER TO postgres;

--
-- Name: favoris; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoris (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    recette_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.favoris OWNER TO postgres;

--
-- Name: meal_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meal_plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    week_start date NOT NULL,
    day_index integer NOT NULL,
    slot integer NOT NULL,
    recette_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT meal_plans_day_index_check CHECK (((day_index >= 0) AND (day_index <= 6))),
    CONSTRAINT meal_plans_slot_check CHECK (((slot >= 0) AND (slot <= 2)))
);


ALTER TABLE public.meal_plans OWNER TO postgres;

--
-- Name: newsletter_subscribers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter_subscribers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    confirmed boolean DEFAULT false,
    source text DEFAULT 'website'::text,
    subscribed_at timestamp with time zone DEFAULT now(),
    unsubscribed_at timestamp with time zone
);


ALTER TABLE public.newsletter_subscribers OWNER TO postgres;

--
-- Name: planificateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planificateur (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    semaine date NOT NULL,
    lundi uuid,
    mardi uuid,
    mercredi uuid,
    jeudi uuid,
    vendredi uuid,
    samedi uuid,
    dimanche uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.planificateur OWNER TO postgres;

--
-- Name: planning_favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planning_favorites (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    planning_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.planning_favorites OWNER TO postgres;

--
-- Name: planning_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planning_likes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    planning_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.planning_likes OWNER TO postgres;

--
-- Name: profils; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profils (
    id uuid NOT NULL,
    pseudo text,
    avatar_url text,
    modele_thermomix text[] DEFAULT ARRAY['TM6'::text],
    bio text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    theme_preference text DEFAULT 'system'::text,
    notify_replies boolean DEFAULT true,
    notify_moderation boolean DEFAULT true,
    last_seen date,
    login_streak integer DEFAULT 0
);


ALTER TABLE public.profils OWNER TO postgres;

--
-- Name: recettes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recettes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    auteur_id uuid,
    titre text NOT NULL,
    description text NOT NULL,
    image_url text,
    video_youtube_id text,
    temps_preparation integer DEFAULT 15 NOT NULL,
    temps_cuisson integer DEFAULT 20 NOT NULL,
    difficulte text NOT NULL,
    nombre_portions integer DEFAULT 4 NOT NULL,
    modele_thermomix text[] DEFAULT ARRAY['TM6'::text, 'TM7'::text] NOT NULL,
    categories text[] DEFAULT ARRAY['plat'::text] NOT NULL,
    regime text[] DEFAULT ARRAY[]::text[] NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[] NOT NULL,
    calories_par_portion integer,
    nutriscore character(1),
    nutriscore_note text,
    ingredients jsonb NOT NULL,
    etapes jsonb NOT NULL,
    faq jsonb,
    note_moyenne numeric(3,2) DEFAULT 0,
    nombre_notes integer DEFAULT 0,
    vues integer DEFAULT 0,
    approuve boolean DEFAULT false,
    raison_rejet text,
    publie boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT recettes_difficulte_check CHECK ((difficulte = ANY (ARRAY['facile'::text, 'moyen'::text, 'difficile'::text]))),
    CONSTRAINT recettes_note_moyenne_check CHECK (((note_moyenne >= (0)::numeric) AND (note_moyenne <= (5)::numeric))),
    CONSTRAINT recettes_nutriscore_check CHECK ((nutriscore = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar, 'E'::bpchar])))
);


ALTER TABLE public.recettes OWNER TO postgres;

--
-- Name: recipe_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    recette_id uuid NOT NULL,
    content text NOT NULL,
    rating integer,
    approved boolean DEFAULT false,
    parent_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    image_url text,
    CONSTRAINT recipe_comments_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.recipe_comments OWNER TO postgres;

--
-- Name: recipe_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_ratings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    recette_id uuid NOT NULL,
    rating integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT recipe_ratings_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.recipe_ratings OWNER TO postgres;

--
-- Name: submission_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.submission_log (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    submitted_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.submission_log OWNER TO postgres;

--
-- Name: suppression_feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppression_feedbacks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    raison text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);


ALTER TABLE public.suppression_feedbacks OWNER TO postgres;

--
-- Name: user_achievements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_achievements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    achievement_code text NOT NULL,
    unlocked_at timestamp with time zone DEFAULT now(),
    notified boolean DEFAULT false
);


ALTER TABLE public.user_achievements OWNER TO postgres;

--
-- Name: user_plannings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_plannings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    is_public boolean DEFAULT false,
    week_start date NOT NULL,
    data jsonb NOT NULL,
    likes_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_plannings OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb,
    metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
c8e2c56a-4593-40d0-91c7-b441cfe91bda	389c5d94-48f9-44d1-a271-4581593837c7	945773d9-97de-472a-8c05-5a8e787adf3a	s256	okZrl6R1QxTxTjyUUfr7Gd6ewy6OTTMQutHMaEv29bc	email			2026-04-13 23:12:30.852325+00	2026-04-13 23:12:45.901528+00	email/signup	2026-04-13 23:12:45.901478+00	\N	\N	\N	\N	f
646f46d1-6e98-47d6-a7d5-7d9ab3b4234e	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	b73d538b-307b-467d-9a50-5754d25760d7	s256	8IxjS_3BAeSzGnELvfjJLrSt4UbF8dGa_s9G0y_qDb0	email			2026-04-13 23:18:52.542361+00	2026-04-13 23:19:04.30423+00	email/signup	2026-04-13 23:19:04.304182+00	\N	\N	\N	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
069d6470-5a63-499e-b379-f99a9c40da8c	069d6470-5a63-499e-b379-f99a9c40da8c	{"sub": "069d6470-5a63-499e-b379-f99a9c40da8c", "email": "laribi.khaled69150@gmail.com", "pseudo": "khaldon", "email_verified": false, "phone_verified": false}	email	2026-04-05 12:24:53.193726+00	2026-04-05 12:24:53.193794+00	2026-04-05 12:24:53.193794+00	33134767-f394-4cc4-b28a-e6213baa5cfb
8149b8cb-a842-45a3-accc-e38f2f401655	8149b8cb-a842-45a3-accc-e38f2f401655	{"sub": "8149b8cb-a842-45a3-accc-e38f2f401655", "email": "test@test.com", "pseudo": "test", "email_verified": false, "phone_verified": false}	email	2026-04-13 09:15:30.698131+00	2026-04-13 09:15:30.698186+00	2026-04-13 09:15:30.698186+00	cd3871b5-ab31-4f9b-b63c-3d767efaf911
389c5d94-48f9-44d1-a271-4581593837c7	389c5d94-48f9-44d1-a271-4581593837c7	{"sub": "389c5d94-48f9-44d1-a271-4581593837c7", "email": "zbouby69150@gmail.com", "pseudo": "Florian75", "email_verified": true, "phone_verified": false}	email	2026-04-13 23:12:30.84803+00	2026-04-13 23:12:30.848081+00	2026-04-13 23:12:30.848081+00	8841e0bc-9142-4434-8f5c-4288c26ce82f
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
e87dcc4f-70d2-4bee-b1a3-c80047d81e2b	2026-04-14 11:06:04.693975+00	2026-04-14 11:06:04.693975+00	password	6d707795-6ecb-49a1-a689-30887386f204
541a08e9-e1d1-47e2-81af-fca6aa3e563b	2026-04-14 22:17:08.286438+00	2026-04-14 22:17:08.286438+00	password	36ea209e-c206-474f-8e9b-56c7812e1717
3e18cbd5-3d50-4938-88e8-9f8dfcee13cf	2026-04-14 23:39:20.439227+00	2026-04-14 23:39:20.439227+00	password	2cc6c4e9-3d6c-4e49-b085-784444bceb5b
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	156	itkfjmbm7bfs	389c5d94-48f9-44d1-a271-4581593837c7	t	2026-04-14 20:21:53.977715+00	2026-04-14 21:20:24.299648+00	tmmq543d3rol	e87dcc4f-70d2-4bee-b1a3-c80047d81e2b
00000000-0000-0000-0000-000000000000	159	3p2jm7gnrdn6	389c5d94-48f9-44d1-a271-4581593837c7	f	2026-04-14 21:20:24.311754+00	2026-04-14 21:20:24.311754+00	itkfjmbm7bfs	e87dcc4f-70d2-4bee-b1a3-c80047d81e2b
00000000-0000-0000-0000-000000000000	163	xlfb7zgwqf4f	8149b8cb-a842-45a3-accc-e38f2f401655	f	2026-04-14 22:17:08.280389+00	2026-04-14 22:17:08.280389+00	\N	541a08e9-e1d1-47e2-81af-fca6aa3e563b
00000000-0000-0000-0000-000000000000	164	2p4xjmcgp6od	8149b8cb-a842-45a3-accc-e38f2f401655	t	2026-04-14 23:39:20.421807+00	2026-04-15 08:40:30.980311+00	\N	3e18cbd5-3d50-4938-88e8-9f8dfcee13cf
00000000-0000-0000-0000-000000000000	165	d52halurbaxs	8149b8cb-a842-45a3-accc-e38f2f401655	f	2026-04-15 08:40:30.992609+00	2026-04-15 08:40:30.992609+00	2p4xjmcgp6od	3e18cbd5-3d50-4938-88e8-9f8dfcee13cf
00000000-0000-0000-0000-000000000000	141	npw5qfogiwov	389c5d94-48f9-44d1-a271-4581593837c7	t	2026-04-14 11:06:04.692063+00	2026-04-14 13:46:04.126464+00	\N	e87dcc4f-70d2-4bee-b1a3-c80047d81e2b
00000000-0000-0000-0000-000000000000	144	k46bjrsavsf7	389c5d94-48f9-44d1-a271-4581593837c7	t	2026-04-14 13:46:04.133353+00	2026-04-14 17:05:52.302478+00	npw5qfogiwov	e87dcc4f-70d2-4bee-b1a3-c80047d81e2b
00000000-0000-0000-0000-000000000000	150	z5oj6zq46vcb	389c5d94-48f9-44d1-a271-4581593837c7	t	2026-04-14 17:05:52.316869+00	2026-04-14 19:22:55.16596+00	k46bjrsavsf7	e87dcc4f-70d2-4bee-b1a3-c80047d81e2b
00000000-0000-0000-0000-000000000000	152	tmmq543d3rol	389c5d94-48f9-44d1-a271-4581593837c7	t	2026-04-14 19:22:55.184134+00	2026-04-14 20:21:53.960402+00	z5oj6zq46vcb	e87dcc4f-70d2-4bee-b1a3-c80047d81e2b
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
e87dcc4f-70d2-4bee-b1a3-c80047d81e2b	389c5d94-48f9-44d1-a271-4581593837c7	2026-04-14 11:06:04.685968+00	2026-04-14 21:20:24.39054+00	\N	aal1	\N	2026-04-14 21:20:24.390452	node	51.44.212.159	\N	\N	\N	\N	\N
541a08e9-e1d1-47e2-81af-fca6aa3e563b	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-14 22:17:08.25007+00	2026-04-14 22:17:08.25007+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36	78.120.135.131	\N	\N	\N	\N	\N
3e18cbd5-3d50-4938-88e8-9f8dfcee13cf	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-14 23:39:20.399822+00	2026-04-15 08:40:31.011051+00	\N	aal1	\N	2026-04-15 08:40:31.010917	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	78.120.135.131	\N	\N	\N	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	389c5d94-48f9-44d1-a271-4581593837c7	authenticated	authenticated	zbouby69150@gmail.com	$2a$10$gq0Z7/wvaK4tPtCnlKyJXeshhbZc6Kjy9o1DkzpCO5jkvunyHhMGu	2026-04-13 23:12:45.88863+00	\N		2026-04-13 23:12:30.865574+00		\N			\N	2026-04-14 11:06:04.685863+00	{"provider": "email", "providers": ["email"]}	{"sub": "389c5d94-48f9-44d1-a271-4581593837c7", "email": "zbouby69150@gmail.com", "pseudo": "Florian75", "email_verified": true, "phone_verified": false}	\N	2026-04-13 23:12:30.824434+00	2026-04-14 21:20:24.318587+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	069d6470-5a63-499e-b379-f99a9c40da8c	authenticated	authenticated	laribi.khaled69150@gmail.com	$2a$10$8.w2BJpUMh.NeP/FMBNhy.jnTykINwqwjTLycp2pjS2AFAFmQRvzi	2026-04-05 12:24:53.198012+00	\N		\N		\N			\N	2026-04-14 22:07:59.072935+00	{"provider": "email", "providers": ["email"]}	{"sub": "069d6470-5a63-499e-b379-f99a9c40da8c", "email": "laribi.khaled69150@gmail.com", "pseudo": "khaldon", "email_verified": true, "phone_verified": false}	\N	2026-04-05 12:24:53.16954+00	2026-04-14 22:07:59.075377+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8149b8cb-a842-45a3-accc-e38f2f401655	authenticated	authenticated	test@test.com	$2a$10$HOkfFX1JDFDAi0lo9hPRre35ReDzCfcZewXidy20HEJaU0GzkvoZO	2026-04-13 09:15:30.701911+00	\N		\N		\N			\N	2026-04-14 23:39:20.399707+00	{"provider": "email", "providers": ["email"]}	{"sub": "8149b8cb-a842-45a3-accc-e38f2f401655", "email": "test@test.com", "pseudo": "test", "email_verified": true, "phone_verified": false}	\N	2026-04-13 09:15:30.654926+00	2026-04-15 08:40:30.998283+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (user_id, created_at) FROM stdin;
069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-05 12:40:38.258212+00
\.


--
-- Data for Name: banned_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banned_users (id, email, user_id, reason, banned_by, banned_at) FROM stdin;
\.


--
-- Data for Name: comment_votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment_votes (id, user_id, comment_id, vote_type, created_at) FROM stdin;
\.


--
-- Data for Name: favoris; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoris (id, user_id, recette_id, created_at) FROM stdin;
014aa4e2-2f70-4d50-935e-81513d4db5d2	069d6470-5a63-499e-b379-f99a9c40da8c	62b5e753-27ba-459b-805d-5da2996d290d	2026-04-12 19:46:46.399268+00
6778dce1-f54b-48d6-94bb-fc4a5070fce1	069d6470-5a63-499e-b379-f99a9c40da8c	1f4cf79d-3fc0-4128-9fa0-6206806a2e92	2026-04-12 22:45:02.779065+00
eb299631-b833-4890-97e9-8115860257e5	069d6470-5a63-499e-b379-f99a9c40da8c	84852963-0cc1-4522-a2b3-460734609af6	2026-04-13 10:49:41.551318+00
74ee65f9-343a-4a5a-bdd6-f7ad98a4d945	8149b8cb-a842-45a3-accc-e38f2f401655	6307b03f-dab6-48f2-8715-89adcc6b732f	2026-04-14 19:34:34.797454+00
e2339b30-e862-4f0a-ba10-a76e3c8c3186	8149b8cb-a842-45a3-accc-e38f2f401655	352896bc-22e7-423c-b7c7-909788baaf10	2026-04-14 19:34:42.240067+00
9ac785c0-87b1-49d5-9cb9-e87cf6e374fa	069d6470-5a63-499e-b379-f99a9c40da8c	756127db-376c-4b80-9b46-4709da2e5e27	2026-04-14 21:47:43.820855+00
1ecd69f1-0bfd-4758-bd22-6fb2853cc267	069d6470-5a63-499e-b379-f99a9c40da8c	a5f85490-26f4-4494-b03e-15281616e1c6	2026-04-14 21:47:49.822552+00
0f419799-3c65-463a-852a-48f0f67afbfb	069d6470-5a63-499e-b379-f99a9c40da8c	77e85d38-2244-4f7d-ada5-aa0cf702e9c3	2026-04-14 21:47:56.03395+00
e253a30f-2613-4c5b-8680-cb10b4807a50	069d6470-5a63-499e-b379-f99a9c40da8c	34768d39-4f77-4b2c-bf3a-e6f34a707404	2026-04-14 21:48:02.473998+00
\.


--
-- Data for Name: meal_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meal_plans (id, user_id, week_start, day_index, slot, recette_id, created_at) FROM stdin;
9a3b09e0-ec07-4f0d-8a7c-d3a03a7691c1	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	0	0	a5f85490-26f4-4494-b03e-15281616e1c6	2026-04-14 22:13:05.479839+00
ca07cce0-38a4-49d8-8dbb-3fc47f4ceb98	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	0	1	84852963-0cc1-4522-a2b3-460734609af6	2026-04-14 22:13:05.479839+00
3944a7ee-bb19-443f-9d0b-58765011d744	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	0	2	34768d39-4f77-4b2c-bf3a-e6f34a707404	2026-04-14 22:13:05.479839+00
97cb2a39-2eaa-4af5-bd4d-2ea291beab86	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	1	0	84852963-0cc1-4522-a2b3-460734609af6	2026-04-14 22:13:05.479839+00
d7ef4668-5947-493f-aa6d-d3dec2424564	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	1	1	1f4cf79d-3fc0-4128-9fa0-6206806a2e92	2026-04-14 22:13:05.479839+00
3cf8757a-a41a-4dfe-84ab-17677158570e	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	2	0	84852963-0cc1-4522-a2b3-460734609af6	2026-04-14 22:13:05.479839+00
4388db06-a140-41bd-8f5a-5e720e1a798d	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	2	1	84852963-0cc1-4522-a2b3-460734609af6	2026-04-14 22:13:05.479839+00
8ef6c3af-3e5d-4721-8e4d-55dd4ccca7de	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	3	0	f7588f31-9e3f-43b4-b308-760aafb7a58e	2026-04-14 22:13:05.479839+00
59902484-7a4a-40ab-b2a1-1082e77440fa	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	3	1	84852963-0cc1-4522-a2b3-460734609af6	2026-04-14 22:13:05.479839+00
562053b9-bb90-427c-99c3-fa1e6a4fdce0	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	4	0	7147a4e1-34ed-4fd1-b144-f6e538ad95a9	2026-04-14 22:13:05.479839+00
5fe7c5ca-c1bb-4e36-940a-443c79d7d8ec	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	5	0	34768d39-4f77-4b2c-bf3a-e6f34a707404	2026-04-14 22:13:05.479839+00
d722aaa4-f6a2-4092-a7ef-921e3bd5d9fd	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	5	1	756127db-376c-4b80-9b46-4709da2e5e27	2026-04-14 22:13:05.479839+00
d642b5f3-c078-4c8e-9431-dd060d75fb68	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12	6	0	77e85d38-2244-4f7d-ada5-aa0cf702e9c3	2026-04-14 22:13:05.479839+00
57f05d4c-c769-42c2-bd43-b20858a9aa52	389c5d94-48f9-44d1-a271-4581593837c7	2026-04-12	1	0	243edfe5-0857-4026-be9a-5570335f7b66	2026-04-14 21:20:10.25586+00
561382a3-412a-410f-8049-0f0dde51aea8	389c5d94-48f9-44d1-a271-4581593837c7	2026-04-12	3	0	eeace966-f522-45a9-b1fa-fd7460f307cf	2026-04-14 21:20:10.25586+00
dee047b0-f257-4edc-8638-59b0f0638fac	389c5d94-48f9-44d1-a271-4581593837c7	2026-04-12	5	0	5ddbf6ab-b669-447d-94ef-362631eda280	2026-04-14 21:20:10.25586+00
ae4611c0-8b9b-4dc1-8e8d-3568da98ef77	389c5d94-48f9-44d1-a271-4581593837c7	2026-04-12	6	0	352896bc-22e7-423c-b7c7-909788baaf10	2026-04-14 21:20:10.25586+00
8157391b-7110-4ae4-87a5-a7635386a7b8	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	0	0	352896bc-22e7-423c-b7c7-909788baaf10	2026-04-14 23:39:44.612942+00
c436569a-05a8-4a81-b2b1-871b2121e787	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	1	0	6307b03f-dab6-48f2-8715-89adcc6b732f	2026-04-14 23:39:44.612942+00
7674006a-c81a-4285-900d-8529bac35409	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	2	0	843ecad3-0d20-4ea4-b345-6a7d93590fd3	2026-04-14 23:39:44.612942+00
ecda2225-aee0-4a31-a5a5-3556903141b2	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	3	0	352896bc-22e7-423c-b7c7-909788baaf10	2026-04-14 23:39:44.612942+00
f2c334ef-68a2-44f2-85f5-2b2c9caa8785	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	3	1	352896bc-22e7-423c-b7c7-909788baaf10	2026-04-14 23:39:44.612942+00
e2027c04-a95c-4f08-a4dc-78bfde6493ad	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	4	0	c08e4855-b08d-4b7a-b4bc-94938571fe76	2026-04-14 23:39:44.612942+00
df57a1c9-178f-4ce2-8be3-f3019504ef79	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	5	0	e06c7805-6733-4691-91d2-8a8f51d34a3a	2026-04-14 23:39:44.612942+00
bc7ea1b1-f971-4f98-ae98-5fa337234e1c	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	5	1	352896bc-22e7-423c-b7c7-909788baaf10	2026-04-14 23:39:44.612942+00
8934e5e4-84ca-46e3-ad35-f94f8fe7f6fa	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-12	6	0	352896bc-22e7-423c-b7c7-909788baaf10	2026-04-14 23:39:44.612942+00
\.


--
-- Data for Name: newsletter_subscribers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newsletter_subscribers (id, email, confirmed, source, subscribed_at, unsubscribed_at) FROM stdin;
\.


--
-- Data for Name: planificateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planificateur (id, user_id, semaine, lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: planning_favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planning_favorites (id, user_id, planning_id, created_at) FROM stdin;
\.


--
-- Data for Name: planning_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planning_likes (id, user_id, planning_id, created_at) FROM stdin;
\.


--
-- Data for Name: profils; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profils (id, pseudo, avatar_url, modele_thermomix, bio, created_at, updated_at, theme_preference, notify_replies, notify_moderation, last_seen, login_streak) FROM stdin;
069d6470-5a63-499e-b379-f99a9c40da8c	khaldon	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/avatars/069d6470-5a63-499e-b379-f99a9c40da8c-0.47153607549552834.webp	{COMPANION,TM5,COOK_EXPERT}	\N	2026-04-05 12:24:53.166851+00	2026-04-14 08:13:42.095714+00	grey	f	t	2026-04-14	4
389c5d94-48f9-44d1-a271-4581593837c7	Florian75	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/avatars/389c5d94-48f9-44d1-a271-4581593837c7-0.5634091032900617.webp	{TM6}	\N	2026-04-13 23:12:30.824099+00	2026-04-14 19:24:53.93567+00	system	t	t	2026-04-14	1
8149b8cb-a842-45a3-accc-e38f2f401655	test	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/avatars/8149b8cb-a842-45a3-accc-e38f2f401655-0.932560471037056.webp	{TM6}	\N	2026-04-13 09:15:30.653937+00	2026-04-14 22:57:53.831459+00	system	t	t	2026-04-14	2
\.


--
-- Data for Name: recettes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recettes (id, slug, auteur_id, titre, description, image_url, video_youtube_id, temps_preparation, temps_cuisson, difficulte, nombre_portions, modele_thermomix, categories, regime, tags, calories_par_portion, nutriscore, nutriscore_note, ingredients, etapes, faq, note_moyenne, nombre_notes, vues, approuve, raison_rejet, publie, created_at, updated_at) FROM stdin;
1f4cf79d-3fc0-4128-9fa0-6206806a2e92	smoothie-mangue-coco-thermomix	\N	Smoothie mangue-coco	Un smoothie tropical onctueux et vitaminé. Le Thermomix broie la mangue surgelée en quelques secondes pour une texture glacée parfaite.	\N	\N	5	0	facile	4	{TM5,TM6,TM7}	{boisson}	{vegan,sans-gluten,sans-lactose}	{smoothie,tropical,express,été}	145	A	Estimation indicative basée sur les ingrédients	[{"nom": "Mangue surgelée", "unite": "g", "quantite": 300, "categorie": "Surgelés"}, {"nom": "Lait de coco", "unite": "ml", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Banane", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Jus de citron vert", "unite": "ml", "quantite": 15, "categorie": "Fruits & Légumes"}, {"nom": "Miel ou sirop d'agave", "unite": "ml", "quantite": 15, "categorie": "Épicerie"}]	[{"duree": 30, "numero": 1, "vitesse": 8, "instruction": "Mettre la mangue surgelée, la banane coupée en rondelles et le lait de coco dans le bol."}, {"duree": 20, "numero": 2, "conseil": "Si trop épais, ajouter un peu d'eau.", "vitesse": 10, "instruction": "Ajouter le jus de citron vert et le miel. Mixer jusqu'à obtenir une consistance lisse."}]	[{"reponse": "Oui, mais ajoutez quelques glaçons pour la texture glacée.", "question": "Peut-on utiliser de la mangue fraîche ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:50.50761+00	2026-04-12 13:12:50.50761+00
62b5e753-27ba-459b-805d-5da2996d290d	sauce-tomate-express-thermomix	\N	Sauce tomate express à l'italienne	Une sauce tomate parfumée prête en 15 minutes. Basilic frais, ail et huile d'olive — la base de la cuisine italienne sans effort.	\N	\N	5	10	facile	4	{TM5,TM6,TM7}	{sauce}	{vegan,sans-gluten,sans-lactose}	{sauce,tomate,italien,express,base}	85	A	Estimation indicative	[{"nom": "Tomates pelées en boîte", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Gousse d'ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 20, "categorie": "Condiments"}, {"nom": "Basilic frais", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Sucre", "unite": "g", "quantite": 5, "categorie": "Épicerie"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Mettre l'oignon et l'ail dans le bol. Hacher."}, {"duree": 120, "numero": 2, "vitesse": 1, "instruction": "Ajouter l'huile d'olive et faire revenir.", "temperature": 120}, {"duree": 480, "numero": 3, "vitesse": 2, "instruction": "Ajouter les tomates pelées, le sucre, le sel et le poivre. Cuire.", "temperature": 100}, {"duree": 10, "numero": 4, "conseil": "Laisser quelques morceaux pour la texture.", "vitesse": 6, "instruction": "Ajouter le basilic frais et mixer brièvement."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:50.868621+00	2026-04-12 13:12:50.868621+00
eeace966-f522-45a9-b1fa-fd7460f307cf	houmous-maison-thermomix	\N	Houmous maison crémeux	Un houmous ultra crémeux au tahini et citron. Le Thermomix obtient une texture soyeuse impossible à reproduire au mixeur classique.	\N	\N	10	0	facile	4	{TM5,TM6,TM7}	{aperitif,entree}	{vegan,sans-gluten,sans-lactose}	{houmous,"pois chiches",mezze,express}	195	A	Estimation indicative	[{"nom": "Pois chiches en boîte (égouttés)", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Tahini (purée de sésame)", "unite": "g", "quantite": 60, "categorie": "Épicerie"}, {"nom": "Jus de citron", "unite": "ml", "quantite": 40, "categorie": "Fruits & Légumes"}, {"nom": "Gousse d'ail", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 30, "categorie": "Condiments"}, {"nom": "Cumin moulu", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Eau glacée", "unite": "ml", "quantite": 30, "categorie": "Autre"}]	[{"duree": 5, "numero": 1, "vitesse": 7, "instruction": "Mettre l'ail dans le bol et hacher finement."}, {"duree": 15, "numero": 2, "vitesse": 5, "instruction": "Ajouter les pois chiches égouttés, le tahini, le jus de citron, le cumin et le sel."}, {"duree": 60, "numero": 3, "conseil": "L'eau glacée est le secret d'un houmous ultra lisse.", "vitesse": 10, "instruction": "Racler les parois, ajouter l'eau glacée et l'huile d'olive. Mixer à vitesse maximale."}]	[{"reponse": "Au réfrigérateur dans un contenant hermétique, jusqu'à 5 jours.", "question": "Comment conserver le houmous ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:50.95454+00	2026-04-12 13:12:50.95454+00
f7588f31-9e3f-43b4-b308-760aafb7a58e	compote-pommes-cannelle-thermomix	\N	Compote de pommes à la cannelle	Une compote maison sans sucre ajouté, parfumée à la cannelle. Idéale pour les enfants et les desserts légers.	\N	\N	10	10	facile	4	{TM5,TM6,TM7}	{dessert}	{vegan,sans-gluten,sans-lactose}	{compote,pomme,cannelle,enfant,express}	95	A	Estimation indicative	[{"nom": "Pommes", "unite": "g", "quantite": 600, "categorie": "Fruits & Légumes"}, {"nom": "Cannelle moulue", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Eau", "unite": "ml", "quantite": 50, "categorie": "Autre"}, {"nom": "Jus de citron", "unite": "ml", "quantite": 10, "categorie": "Fruits & Légumes"}]	[{"duree": 5, "numero": 1, "vitesse": 4, "instruction": "Éplucher et couper les pommes en quartiers. Les mettre dans le bol avec l'eau."}, {"duree": 600, "numero": 2, "vitesse": 2, "accessoire": "spatule", "instruction": "Cuire les pommes.", "temperature": 100}, {"duree": 15, "numero": 3, "conseil": "Vitesse 3-4 pour une compote avec morceaux.", "vitesse": 5, "instruction": "Ajouter la cannelle et le jus de citron. Mixer selon la texture souhaitée."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.026937+00	2026-04-12 13:12:51.026937+00
53c38f1b-c5fd-4c7c-b41a-862df02db09a	vinaigrette-universelle-thermomix	\N	Vinaigrette universelle émulsionnée	Une vinaigrette parfaitement émulsionnée grâce au Thermomix. Se conserve 2 semaines au frigo.	\N	\N	5	0	facile	4	{TM5,TM6,TM7}	{sauce}	{vegan,sans-gluten,sans-lactose}	{vinaigrette,salade,express,base}	170	C	Estimation indicative	[{"nom": "Huile d'olive", "unite": "ml", "quantite": 100, "categorie": "Condiments"}, {"nom": "Vinaigre de cidre", "unite": "ml", "quantite": 30, "categorie": "Condiments"}, {"nom": "Moutarde de Dijon", "unite": "g", "quantite": 15, "categorie": "Condiments"}, {"nom": "Miel", "unite": "g", "quantite": 10, "categorie": "Épicerie"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 15, "numero": 1, "vitesse": 5, "instruction": "Mettre tous les ingrédients dans le bol."}, {"duree": 20, "numero": 2, "conseil": "La vinaigrette reste émulsionnée grâce à la moutarde.", "vitesse": 10, "instruction": "Émulsionner à vitesse maximale."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.256213+00	2026-04-12 13:12:51.256213+00
5ddbf6ab-b669-447d-94ef-362631eda280	mayonnaise-maison-thermomix	\N	Mayonnaise maison en 1 minute	La vraie mayonnaise maison, onctueuse et sans conservateur. Le Thermomix émulsionne parfaitement en quelques secondes.	\N	\N	5	0	facile	4	{TM6,TM7}	{sauce}	{sans-gluten}	{mayonnaise,sauce,express,base}	320	D	Riche en lipides	[{"nom": "Jaune d'œuf", "unite": "pièce", "quantite": 1, "categorie": "Produits laitiers"}, {"nom": "Moutarde de Dijon", "unite": "g", "quantite": 10, "categorie": "Condiments"}, {"nom": "Huile de tournesol", "unite": "ml", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Jus de citron", "unite": "ml", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 10, "numero": 1, "vitesse": 4, "instruction": "Mettre le jaune d'œuf, la moutarde, le sel et le jus de citron dans le bol."}, {"duree": 60, "numero": 2, "conseil": "Verser lentement pour une émulsion parfaite.", "vitesse": 4, "instruction": "Programmer vitesse 4 et verser l'huile en filet continu par le bouchon."}]	[{"reponse": "Les ingrédients doivent être à température ambiante. L'huile doit être versée très lentement.", "question": "Pourquoi ma mayonnaise est ratée ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:51.106837+00	2026-04-12 13:12:51.106837+00
5d9f5945-543b-4445-9bf6-39587546fe6d	risotto-parmesan-thermomix	\N	Risotto crémeux au parmesan	Un risotto onctueux cuit sans surveillance. Le Thermomix touille à votre place pour un résultat restaurant à la maison.	\N	\N	5	25	facile	4	{TM5,TM6,TM7}	{plat}	{vegetarien}	{risotto,parmesan,italien,rapide,crémeux}	420	B	Estimation indicative	[{"nom": "Riz arborio", "unite": "g", "quantite": 300, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Bouillon de légumes chaud", "unite": "ml", "quantite": 800, "categorie": "Épicerie"}, {"nom": "Vin blanc sec", "unite": "ml", "quantite": 100, "categorie": "Boissons"}, {"nom": "Parmesan râpé", "unite": "g", "quantite": 80, "categorie": "Produits laitiers"}, {"nom": "Beurre", "unite": "g", "quantite": 30, "categorie": "Produits laitiers"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 15, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Hacher l'oignon."}, {"duree": 180, "numero": 2, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter l'huile d'olive et faire revenir.", "temperature": 120}, {"duree": 120, "numero": 3, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter le riz et nacrer.", "temperature": 120}, {"duree": 120, "numero": 4, "vitesse": 1, "accessoire": "spatule", "instruction": "Verser le vin blanc et laisser absorber.", "temperature": 100}, {"duree": 1080, "numero": 5, "conseil": "Ne pas ouvrir le couvercle pendant la cuisson.", "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter le bouillon chaud. Cuire en mode mijotage.", "temperature": 98}, {"duree": 30, "numero": 6, "conseil": "La mantecatura donne le crémeux final.", "vitesse": 1, "instruction": "Ajouter le beurre et le parmesan. Mélanger doucement."}]	[{"reponse": "Le riz arborio ou carnaroli sont idéaux pour le risotto. N'utilisez pas de riz basmati.", "question": "Quel riz utiliser ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:51.324238+00	2026-04-12 13:12:51.324238+00
843ecad3-0d20-4ea4-b345-6a7d93590fd3	pates-carbonara-thermomix	\N	Pâtes à la carbonara authentique	La vraie carbonara italienne : guanciale, jaunes d'œufs, pecorino et poivre. Sans crème. Le Thermomix gère la sauce onctueuse.	\N	\N	10	20	moyen	4	{TM5,TM6,TM7}	{plat}	{}	{pâtes,carbonara,italien,rapide}	520	C	Estimation indicative	[{"nom": "Spaghetti", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Guanciale ou lardons", "unite": "g", "quantite": 150, "categorie": "Viandes & Poissons"}, {"nom": "Jaunes d'œufs", "unite": "pièce", "quantite": 4, "categorie": "Produits laitiers"}, {"nom": "Pecorino romano râpé", "unite": "g", "quantite": 80, "categorie": "Produits laitiers"}, {"nom": "Poivre noir", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Eau", "unite": "ml", "quantite": 1500, "categorie": "Autre"}, {"nom": "Sel", "unite": "g", "quantite": 10, "categorie": "Condiments"}]	[{"duree": 600, "numero": 1, "vitesse": 1, "instruction": "Mettre l'eau et le sel dans le bol. Porter à ébullition.", "temperature": 100}, {"duree": 720, "numero": 2, "vitesse": 1, "accessoire": "panier", "instruction": "Ajouter les spaghetti dans le panier cuisson. Cuire selon le temps indiqué sur le paquet.", "temperature": 100}, {"numero": 3, "conseil": "Hors Thermomix, à la main.", "instruction": "Pendant ce temps, mélanger les jaunes d'œufs avec le pecorino et le poivre dans un bol séparé."}, {"duree": 30, "numero": 4, "conseil": "Le bol doit être tiède, pas chaud, sinon les œufs cuisent.", "vitesse": 1, "instruction": "Vider l'eau, remettre les pâtes dans le bol avec le guanciale rissolé. Ajouter le mélange œuf-fromage hors feu."}]	[{"reponse": "Non ! La vraie carbonara n'a pas de crème. L'onctuosité vient de l'émulsion jaune d'œuf + pecorino.", "question": "Peut-on mettre de la crème ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:51.539584+00	2026-04-12 13:12:51.539584+00
c08e4855-b08d-4b7a-b4bc-94938571fe76	dahl-lentilles-corail-thermomix	\N	Dahl de lentilles corail	Un dahl indien onctueux aux épices douces. Les lentilles corail fondent en 20 minutes dans le Thermomix.	\N	\N	10	25	facile	4	{TM5,TM6,TM7}	{plat}	{vegan,sans-gluten,sans-lactose}	{dahl,lentilles,indien,vegan,rapide}	260	A	Estimation indicative	[{"nom": "Lentilles corail", "unite": "g", "quantite": 250, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Gousse d'ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Gingembre frais", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Lait de coco", "unite": "ml", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Tomates concassées", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Curcuma", "unite": "g", "quantite": 5, "categorie": "Condiments"}, {"nom": "Cumin moulu", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Coriandre moulue", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Eau", "unite": "ml", "quantite": 400, "categorie": "Autre"}, {"nom": "Huile de coco", "unite": "ml", "quantite": 15, "categorie": "Épicerie"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Hacher l'oignon, l'ail et le gingembre."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Ajouter l'huile de coco et les épices. Faire revenir.", "temperature": 120}, {"duree": 1200, "numero": 3, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter les lentilles rincées, les tomates, le lait de coco et l'eau. Cuire.", "temperature": 100}, {"duree": 10, "numero": 4, "conseil": "Ne pas trop mixer, garder de la texture.", "vitesse": 3, "instruction": "Écraser légèrement pour une texture crémeuse."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.759902+00	2026-04-12 13:12:51.759902+00
c868f19f-10e0-448b-96da-8121f64647a5	pesto-basilic-thermomix	\N	Pesto au basilic frais	Le vrai pesto alla genovese : basilic frais, pignons de pin, parmesan et huile d'olive vierge. Prêt en 5 minutes.	\N	\N	10	0	facile	4	{TM5,TM6,TM7}	{sauce}	{vegetarien,sans-gluten}	{pesto,basilic,italien,express}	280	C	Riche en lipides sains	[{"nom": "Basilic frais", "unite": "g", "quantite": 50, "categorie": "Fruits & Légumes"}, {"nom": "Parmesan râpé", "unite": "g", "quantite": 50, "categorie": "Produits laitiers"}, {"nom": "Pignons de pin", "unite": "g", "quantite": 30, "categorie": "Épicerie"}, {"nom": "Gousse d'ail", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Huile d'olive vierge", "unite": "ml", "quantite": 100, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 10, "numero": 1, "vitesse": 10, "instruction": "Mettre le parmesan en morceaux dans le bol et râper."}, {"duree": 5, "numero": 2, "vitesse": 7, "instruction": "Ajouter l'ail, les pignons de pin et hacher."}, {"duree": 15, "numero": 3, "conseil": "Ne pas trop mixer pour garder du caractère.", "vitesse": 6, "instruction": "Ajouter le basilic et l'huile d'olive. Mixer en gardant une texture légèrement granuleuse."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.182972+00	2026-04-12 13:12:51.182972+00
fe8395c2-5857-4ddf-9870-f94a2d746f5c	soupe-poireaux-pommes-de-terre-thermomix	\N	Soupe poireaux pommes de terre	Un classique réconfortant de la cuisine française. Le Thermomix cuit et mixe en un seul programme.	\N	\N	10	25	facile	4	{TM5,TM6,TM7}	{soupe,entree}	{vegetarien,sans-gluten}	{soupe,poireau,"pomme de terre",hiver,rapide}	165	A	Estimation indicative	[{"nom": "Poireaux", "unite": "g", "quantite": 400, "categorie": "Fruits & Légumes"}, {"nom": "Pommes de terre", "unite": "g", "quantite": 300, "categorie": "Fruits & Légumes"}, {"nom": "Bouillon de légumes", "unite": "ml", "quantite": 600, "categorie": "Épicerie"}, {"nom": "Crème fraîche", "unite": "ml", "quantite": 50, "categorie": "Produits laitiers"}, {"nom": "Beurre", "unite": "g", "quantite": 20, "categorie": "Produits laitiers"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Muscade", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Couper les poireaux en tronçons et les pommes de terre en morceaux. Mettre dans le bol."}, {"duree": 180, "numero": 2, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter le beurre et faire suer.", "temperature": 100}, {"duree": 1200, "numero": 3, "vitesse": 1, "instruction": "Verser le bouillon, saler, poivrer, ajouter la muscade. Cuire.", "temperature": 100}, {"duree": 30, "numero": 4, "vitesse": 5, "instruction": "Ajouter la crème et mixer progressivement."}, {"duree": 30, "numero": 5, "vitesse": 10, "instruction": "Ajuster à vitesse maximale pour un velouté lisse."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.398612+00	2026-04-12 13:12:51.398612+00
bce9c8cf-1fd2-491a-a61d-70f34f3e75b9	gaspacho-andalou-thermomix	\N	Gaspacho andalou glacé	La soupe froide espagnole par excellence. Tomates mûres, concombre, poivron — une explosion de fraîcheur estivale.	\N	\N	15	0	facile	4	{TM5,TM6,TM7}	{soupe,entree}	{vegan,sans-gluten,sans-lactose}	{gaspacho,espagnol,froid,été,rapide}	110	A	Estimation indicative	[{"nom": "Tomates bien mûres", "unite": "g", "quantite": 500, "categorie": "Fruits & Légumes"}, {"nom": "Concombre", "unite": "g", "quantite": 150, "categorie": "Fruits & Légumes"}, {"nom": "Poivron rouge", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Gousse d'ail", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Pain rassis", "unite": "g", "quantite": 50, "categorie": "Boulangerie"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 40, "categorie": "Condiments"}, {"nom": "Vinaigre de xérès", "unite": "ml", "quantite": 20, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 15, "numero": 1, "vitesse": 6, "instruction": "Mettre tous les légumes grossièrement coupés et le pain dans le bol."}, {"duree": 60, "numero": 2, "vitesse": 10, "instruction": "Ajouter l'huile, le vinaigre et le sel. Mixer à fond."}, {"numero": 3, "conseil": "Servir avec des croûtons et un filet d'huile d'olive.", "instruction": "Réfrigérer au moins 1h avant de servir."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.611025+00	2026-04-12 13:12:51.611025+00
0e3ef351-2a6e-47ed-a951-bdb8fa7feb65	gratin-dauphinois-thermomix	\N	Gratin dauphinois traditionnel	Le vrai gratin dauphinois : pommes de terre, crème et muscade. Le Thermomix tranche les pommes de terre à la perfection.	\N	\N	15	45	facile	4	{TM5,TM6,TM7}	{accompagnement,plat}	{vegetarien,sans-gluten}	{gratin,"pomme de terre",dauphinois,classique}	380	C	Estimation indicative	[{"nom": "Pommes de terre", "unite": "g", "quantite": 800, "categorie": "Fruits & Légumes"}, {"nom": "Crème liquide entière", "unite": "ml", "quantite": 400, "categorie": "Produits laitiers"}, {"nom": "Lait", "unite": "ml", "quantite": 200, "categorie": "Produits laitiers"}, {"nom": "Gousse d'ail", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Muscade", "unite": "pincée", "quantite": 2, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Beurre", "unite": "g", "quantite": 15, "categorie": "Produits laitiers"}]	[{"duree": 10, "numero": 1, "conseil": "Utiliser la vitesse 4 pour des tranches régulières de 3mm.", "vitesse": 4, "instruction": "Éplucher les pommes de terre et les trancher finement au Thermomix."}, {"duree": 300, "numero": 2, "vitesse": 2, "instruction": "Dans le bol nettoyé, chauffer la crème, le lait, l'ail écrasé, la muscade, le sel et le poivre.", "temperature": 90}, {"numero": 3, "conseil": "Préchauffer le four à 180°C.", "instruction": "Beurrer un plat à gratin. Disposer les pommes de terre en couches. Verser la crème chaude."}, {"numero": 4, "conseil": "Couvrir de papier alu les 30 premières minutes.", "instruction": "Enfourner 45 minutes à 180°C jusqu'à ce que le dessus soit doré."}]	[{"reponse": "Le vrai dauphinois n'a pas de fromage, mais vous pouvez ajouter du gruyère pour un gratin savoyard.", "question": "Peut-on ajouter du fromage ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:51.841486+00	2026-04-12 13:12:51.841486+00
637c8b4c-22bb-4638-9da4-821312b4c46b	curry-poulet-coco-thermomix	\N	Curry de poulet au lait de coco	Un curry doux et parfumé, le poulet reste tendre grâce à la cuisson douce du Thermomix. Un voyage en Asie en 30 minutes.	\N	\N	10	25	facile	4	{TM6,TM7}	{plat}	{sans-gluten,sans-lactose,halal}	{curry,poulet,coco,asiatique,rapide}	380	B	Estimation indicative	[{"nom": "Blancs de poulet", "unite": "g", "quantite": 500, "categorie": "Viandes & Poissons"}, {"nom": "Lait de coco", "unite": "ml", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Gousse d'ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Gingembre frais", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Pâte de curry jaune", "unite": "g", "quantite": 30, "categorie": "Épicerie"}, {"nom": "Poivron rouge", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Coriandre fraîche", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Huile de tournesol", "unite": "ml", "quantite": 10, "categorie": "Épicerie"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Mettre l'oignon, l'ail et le gingembre dans le bol. Hacher."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Ajouter l'huile et faire revenir.", "temperature": 120}, {"duree": 60, "numero": 3, "vitesse": 2, "instruction": "Ajouter la pâte de curry et mélanger.", "temperature": 100}, {"duree": 1200, "numero": 4, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter le poulet coupé en dés, le poivron en lanières et le lait de coco. Cuire.", "temperature": 98}, {"numero": 5, "conseil": "Goûter et ajuster le sel avant de servir.", "instruction": "Parsemer de coriandre fraîche ciselée. Servir avec du riz basmati."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.466426+00	2026-04-12 13:12:51.466426+00
24695f45-da3f-4c91-9030-302248904517	crepes-bretonnes-thermomix	\N	Crêpes bretonnes moelleuses	La pâte à crêpes parfaite sans grumeaux, grâce au Thermomix. Repos 30 min recommandé puis cuisson à la poêle.	\N	\N	5	20	facile	4	{TM5,TM6,TM7}	{dessert,petit-dejeuner}	{vegetarien}	{crêpes,breton,goûter,rapide}	290	B	Estimation indicative	[{"nom": "Farine", "unite": "g", "quantite": 250, "categorie": "Épicerie"}, {"nom": "Œufs", "unite": "pièce", "quantite": 3, "categorie": "Produits laitiers"}, {"nom": "Lait", "unite": "ml", "quantite": 500, "categorie": "Produits laitiers"}, {"nom": "Beurre fondu", "unite": "g", "quantite": 30, "categorie": "Produits laitiers"}, {"nom": "Sucre", "unite": "g", "quantite": 30, "categorie": "Épicerie"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Extrait de vanille", "unite": "ml", "quantite": 5, "categorie": "Épicerie"}]	[{"duree": 10, "numero": 1, "vitesse": 4, "instruction": "Mettre les œufs, le lait, le beurre fondu, le sucre, le sel et la vanille dans le bol."}, {"duree": 30, "numero": 2, "conseil": "Racler les parois si nécessaire.", "vitesse": 6, "instruction": "Ajouter la farine et mélanger jusqu'à obtenir une pâte lisse."}, {"numero": 3, "conseil": "La pâte doit être fluide comme de la crème liquide.", "instruction": "Laisser reposer 30 minutes au frigo. Cuire les crêpes à la poêle beurrée."}]	[{"reponse": "Oui, supprimez le sucre et la vanille, ajoutez un peu plus de sel.", "question": "Peut-on faire des crêpes salées ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:51.680925+00	2026-04-12 13:12:51.680925+00
243edfe5-0857-4026-be9a-5570335f7b66	cake-citron-pavot-thermomix	\N	Cake au citron et graines de pavot	Un cake moelleux au citron frais et graines de pavot. Le glaçage acidulé au citron apporte la touche finale.	\N	\N	15	45	facile	4	{TM5,TM6,TM7}	{dessert,petit-dejeuner}	{vegetarien}	{cake,citron,pavot,goûter}	340	C	Estimation indicative	[{"nom": "Farine", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Sucre", "unite": "g", "quantite": 150, "categorie": "Épicerie"}, {"nom": "Œufs", "unite": "pièce", "quantite": 3, "categorie": "Produits laitiers"}, {"nom": "Beurre mou", "unite": "g", "quantite": 100, "categorie": "Produits laitiers"}, {"nom": "Citron (zeste et jus)", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Graines de pavot", "unite": "g", "quantite": 20, "categorie": "Épicerie"}, {"nom": "Levure chimique", "unite": "g", "quantite": 8, "categorie": "Épicerie"}, {"nom": "Yaourt nature", "unite": "g", "quantite": 100, "categorie": "Produits laitiers"}]	[{"duree": 10, "numero": 1, "vitesse": 10, "instruction": "Préchauffer le four à 175°C. Zester les citrons dans le bol."}, {"duree": 20, "numero": 2, "vitesse": 5, "instruction": "Ajouter le sucre, le beurre mou et les œufs. Mélanger."}, {"duree": 20, "numero": 3, "conseil": "Ne pas trop mélanger, juste incorporer.", "vitesse": 4, "instruction": "Ajouter la farine, la levure, le yaourt, le jus de citron et les graines de pavot. Mélanger."}, {"numero": 4, "conseil": "Vérifier la cuisson avec un couteau : il doit ressortir sec.", "instruction": "Verser dans un moule à cake beurré. Enfourner 40-45 minutes."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.916249+00	2026-04-12 13:12:51.916249+00
bc5e7364-ec19-46ba-9dc3-f00e93ce086a	blanquette-veau-thermomix	\N	Blanquette de veau à l'ancienne	La blanquette de veau traditionnelle avec sa sauce blanche onctueuse. Le Thermomix assure une cuisson douce parfaite.	\N	\N	20	55	moyen	4	{TM6,TM7}	{plat}	{sans-gluten}	{blanquette,veau,classique,français}	450	B	Estimation indicative	[{"nom": "Épaule de veau", "unite": "g", "quantite": 600, "categorie": "Viandes & Poissons"}, {"nom": "Carottes", "unite": "g", "quantite": 200, "categorie": "Fruits & Légumes"}, {"nom": "Champignons de Paris", "unite": "g", "quantite": 200, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Bouillon de volaille", "unite": "ml", "quantite": 500, "categorie": "Épicerie"}, {"nom": "Crème fraîche", "unite": "ml", "quantite": 100, "categorie": "Produits laitiers"}, {"nom": "Jaune d'œuf", "unite": "pièce", "quantite": 2, "categorie": "Produits laitiers"}, {"nom": "Beurre", "unite": "g", "quantite": 30, "categorie": "Produits laitiers"}, {"nom": "Farine", "unite": "g", "quantite": 20, "categorie": "Épicerie"}, {"nom": "Bouquet garni", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Jus de citron", "unite": "ml", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 2400, "numero": 1, "vitesse": 1, "accessoire": "spatule", "instruction": "Couper le veau en cubes. Mettre dans le bol avec le bouillon, l'oignon coupé en 4 et le bouquet garni.", "temperature": 100}, {"duree": 900, "numero": 2, "vitesse": 1, "instruction": "Ajouter les carottes en rondelles et les champignons. Poursuivre la cuisson.", "temperature": 100}, {"numero": 3, "conseil": "Utiliser le panier pour égoutter facilement.", "instruction": "Retirer la viande et les légumes. Réserver. Garder le bouillon dans le bol."}, {"duree": 180, "numero": 4, "vitesse": 3, "instruction": "Ajouter le beurre et la farine au bouillon. Cuire pour faire un roux.", "temperature": 90}, {"duree": 30, "numero": 5, "conseil": "Ajouter hors feu pour ne pas faire cuire les jaunes.", "vitesse": 3, "instruction": "Mélanger la crème et les jaunes d'œufs dans un bol. Ajouter au Thermomix hors chaleur avec le citron."}, {"duree": 120, "numero": 6, "vitesse": 1, "instruction": "Remettre la viande et les légumes dans la sauce. Réchauffer doucement.", "temperature": 70}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:51.986132+00	2026-04-12 13:12:51.986132+00
ecf2409d-5852-4661-b8df-85cb3ab57612	veloute-courgettes-cookexpert	\N	Velouté de courgettes menthe	Un velouté léger et parfumé à la menthe fraîche. Le Cook Expert cuit et mixe en un programme.	\N	\N	10	10	facile	4	{COOK_EXPERT}	{soupe,entree}	{vegetarien,sans-gluten}	{courgette,menthe,léger,express}	120	A	Estimation indicative	[{"nom": "Courgettes", "unite": "g", "quantite": 500, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Bouillon de légumes", "unite": "ml", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Crème légère", "unite": "ml", "quantite": 50, "categorie": "Produits laitiers"}, {"nom": "Menthe fraîche", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 8, "instruction": "Hacher l'oignon dans le bol du Cook Expert."}, {"duree": 480, "numero": 2, "vitesse": 1, "instruction": "Ajouter les courgettes en morceaux et le bouillon. Cuire au programme Soupe.", "temperature": 100}, {"duree": 30, "numero": 3, "vitesse": 10, "instruction": "Ajouter la crème et la menthe. Mixer."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.190204+00	2026-04-12 13:12:52.190204+00
84826587-9f39-47fa-a04c-d3ff1bf7146c	beurre-noisette-cookexpert	\N	Beurre noisette parfumé	Un beurre noisette doré au Cook Expert, pour sublimer pâtes, poissons ou légumes.	\N	\N	2	8	facile	4	{COOK_EXPERT}	{sauce}	{sans-gluten}	{beurre,noisette,sauce,express}	180	D	Riche en lipides	[{"nom": "Beurre doux", "unite": "g", "quantite": 100, "categorie": "Produits laitiers"}, {"nom": "Jus de citron", "unite": "ml", "quantite": 5, "categorie": "Fruits & Légumes"}]	[{"duree": 480, "numero": 1, "conseil": "Le beurre doit devenir ambré, pas noir.", "vitesse": 1, "instruction": "Mettre le beurre dans le bol. Chauffer en surveillant.", "temperature": 120}, {"duree": 5, "numero": 2, "vitesse": 1, "instruction": "Ajouter le jus de citron pour stopper la cuisson."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.396715+00	2026-04-12 13:12:52.396715+00
62ac19a2-75a0-4b6a-8efc-ffeb7ca8f1f1	poulet-tikka-masala-cookexpert	\N	Poulet tikka masala	Le classique indien : poulet tendre dans une sauce tomate épicée et crémeuse.	\N	\N	15	25	facile	4	{COOK_EXPERT}	{plat}	{sans-gluten,halal}	{poulet,tikka,indien,rapide}	390	B	Estimation indicative	[{"nom": "Blancs de poulet", "unite": "g", "quantite": 500, "categorie": "Viandes & Poissons"}, {"nom": "Tomates concassées", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Crème de coco", "unite": "ml", "quantite": 150, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Garam masala", "unite": "g", "quantite": 10, "categorie": "Condiments"}, {"nom": "Curcuma", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Paprika", "unite": "g", "quantite": 5, "categorie": "Condiments"}, {"nom": "Huile", "unite": "ml", "quantite": 15, "categorie": "Épicerie"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Hacher l'oignon et l'ail."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Ajouter l'huile et les épices. Faire revenir.", "temperature": 120}, {"duree": 1200, "numero": 3, "vitesse": 1, "instruction": "Ajouter le poulet en morceaux, les tomates et la crème de coco. Cuire.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.610929+00	2026-04-12 13:12:52.610929+00
d9af515e-b0d1-46f4-88b5-28865771798c	wok-legumes-nouilles-cookexpert	\N	Wok de légumes et nouilles sautées	Un wok coloré aux légumes croquants et nouilles de riz, façon street food asiatique.	\N	\N	15	15	facile	4	{COOK_EXPERT}	{plat}	{vegan,sans-lactose}	{wok,asiatique,nouilles,rapide}	280	A	Estimation indicative	[{"nom": "Nouilles de riz", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Brocoli", "unite": "g", "quantite": 150, "categorie": "Fruits & Légumes"}, {"nom": "Carotte", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Poivron rouge", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Sauce soja", "unite": "ml", "quantite": 30, "categorie": "Condiments"}, {"nom": "Huile de sésame", "unite": "ml", "quantite": 10, "categorie": "Condiments"}, {"nom": "Gingembre frais", "unite": "g", "quantite": 5, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Graines de sésame", "unite": "g", "quantite": 5, "categorie": "Épicerie"}]	[{"duree": 3, "numero": 1, "vitesse": 5, "instruction": "Hacher l'ail et le gingembre."}, {"duree": 60, "numero": 2, "vitesse": 1, "instruction": "Ajouter l'huile de sésame et faire revenir.", "temperature": 130}, {"duree": 420, "numero": 3, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter les légumes coupés. Sauter.", "temperature": 120}, {"duree": 180, "numero": 4, "conseil": "Parsemer de graines de sésame.", "vitesse": 1, "instruction": "Ajouter les nouilles réhydratées et la sauce soja. Mélanger.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.838133+00	2026-04-12 13:12:52.838133+00
9753c3e5-f456-4621-a615-85feab82df3c	pain-complet-thermomix	\N	Pain complet maison	Un pain complet croustillant à l'extérieur, moelleux à l'intérieur. Le Thermomix pétrit la pâte à la perfection.	\N	\N	15	40	moyen	4	{TM5,TM6,TM7}	{boulangerie}	{vegan}	{pain,complet,boulangerie,"fait maison"}	210	A	Estimation indicative	[{"nom": "Farine complète T150", "unite": "g", "quantite": 300, "categorie": "Épicerie"}, {"nom": "Farine T65", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Eau tiède", "unite": "ml", "quantite": 320, "categorie": "Autre"}, {"nom": "Levure boulangère sèche", "unite": "g", "quantite": 7, "categorie": "Épicerie"}, {"nom": "Sel", "unite": "g", "quantite": 8, "categorie": "Condiments"}, {"nom": "Miel", "unite": "g", "quantite": 10, "categorie": "Épicerie"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 15, "categorie": "Condiments"}]	[{"duree": 30, "numero": 1, "vitesse": 2, "instruction": "Mettre l'eau tiède, la levure et le miel dans le bol. Mélanger et laisser activer 5 min."}, {"duree": 120, "numero": 2, "conseil": "Le mode pétrissage du TM6/TM7 est idéal ici.", "vitesse": 6, "instruction": "Ajouter les farines, le sel et l'huile. Pétrir."}, {"numero": 3, "conseil": "La pâte doit doubler de volume.", "instruction": "Former une boule. Laisser lever 45 minutes dans un saladier couvert d'un linge humide."}, {"numero": 4, "conseil": "Placer un bol d'eau dans le four pour une croûte croustillante.", "instruction": "Dégazer, façonner. Laisser lever 20 min. Enfourner à 220°C pendant 35-40 minutes."}]	[{"reponse": "La levure était peut-être inactive. Vérifiez la date de péremption et la température de l'eau (37°C max).", "question": "Pourquoi mon pain est trop dense ?"}]	0.00	0	0	t	\N	t	2026-04-12 13:12:52.054471+00	2026-04-12 13:12:52.054471+00
7147a4e1-34ed-4fd1-b144-f6e538ad95a9	guacamole-cookexpert	\N	Guacamole frais	Un guacamole crémeux aux saveurs mexicaines. Le Cook Expert hache parfaitement sans sur-mixer.	\N	\N	10	0	facile	4	{COOK_EXPERT}	{aperitif,entree}	{vegan,sans-gluten,sans-lactose}	{guacamole,avocat,mexicain,express}	165	A	Estimation indicative	[{"nom": "Avocats mûrs", "unite": "pièce", "quantite": 3, "categorie": "Fruits & Légumes"}, {"nom": "Tomate", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Oignon rouge", "unite": "pièce", "quantite": 0.5, "categorie": "Fruits & Légumes"}, {"nom": "Coriandre fraîche", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Jus de citron vert", "unite": "ml", "quantite": 20, "categorie": "Fruits & Légumes"}, {"nom": "Piment jalapeño", "unite": "pièce", "quantite": 0.5, "categorie": "Fruits & Légumes"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 3, "numero": 1, "vitesse": 5, "instruction": "Mettre l'oignon et le piment dans le bol. Hacher grossièrement."}, {"duree": 5, "numero": 2, "conseil": "Garder une texture avec morceaux.", "vitesse": 4, "instruction": "Ajouter la chair des avocats, la tomate coupée, le citron vert et le sel. Mixer brièvement."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.259352+00	2026-04-12 13:12:52.259352+00
35e07376-75a9-4097-a07a-c8c578f29f60	soupe-miso-express-cookexpert	\N	Soupe miso express	Une soupe miso japonaise authentique prête en 15 minutes. Réconfortante et légère.	\N	\N	5	10	facile	4	{COOK_EXPERT}	{soupe,entree}	{vegan,sans-lactose}	{miso,japonais,soupe,express}	65	A	Estimation indicative	[{"nom": "Pâte miso", "unite": "g", "quantite": 50, "categorie": "Épicerie"}, {"nom": "Tofu soyeux", "unite": "g", "quantite": 150, "categorie": "Épicerie"}, {"nom": "Algue wakame séchée", "unite": "g", "quantite": 5, "categorie": "Épicerie"}, {"nom": "Oignons verts", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Eau", "unite": "ml", "quantite": 800, "categorie": "Autre"}, {"nom": "Sauce soja", "unite": "ml", "quantite": 10, "categorie": "Condiments"}]	[{"duree": 360, "numero": 1, "vitesse": 1, "instruction": "Chauffer l'eau dans le bol.", "temperature": 90}, {"duree": 120, "numero": 2, "conseil": "Ne pas faire bouillir le miso, il perd ses probiotiques.", "vitesse": 1, "instruction": "Diluer la pâte miso dans un peu d'eau tiède puis ajouter au bol avec le tofu coupé en dés, le wakame et la sauce soja.", "temperature": 70}, {"numero": 3, "instruction": "Servir parsemé d'oignons verts émincés."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.466608+00	2026-04-12 13:12:52.466608+00
157349de-3929-43d5-bd7b-5076c166c81b	ratatouille-provencale-cookexpert	\N	Ratatouille provençale	La ratatouille du sud, mijotée doucement avec les légumes du soleil.	\N	\N	15	25	facile	4	{COOK_EXPERT}	{plat,accompagnement}	{vegan,sans-gluten,sans-lactose}	{ratatouille,provençal,été,rapide}	130	A	Estimation indicative	[{"nom": "Aubergine", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Courgettes", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Poivron rouge", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Poivron jaune", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Tomates", "unite": "g", "quantite": 400, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 30, "categorie": "Condiments"}, {"nom": "Herbes de Provence", "unite": "g", "quantite": 5, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 4, "instruction": "Couper tous les légumes en dés. Hacher l'oignon et l'ail."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Faire revenir l'oignon et l'ail avec l'huile d'olive.", "temperature": 120}, {"duree": 1200, "numero": 3, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter tous les légumes et les herbes. Cuire.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.681587+00	2026-04-12 13:12:52.681587+00
b620f2ed-4709-44e9-8e77-52c66f891000	fondue-chocolat-cookexpert	\N	Fondue au chocolat	Une fondue au chocolat veloutée pour tremper fruits et marshmallows. Le Cook Expert maintient la température parfaite.	\N	\N	5	15	facile	4	{COOK_EXPERT}	{dessert}	{vegetarien,sans-gluten}	{chocolat,fondue,gourmand,rapide}	380	D	Riche en sucre et lipides	[{"nom": "Chocolat noir 70%", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Crème liquide", "unite": "ml", "quantite": 150, "categorie": "Produits laitiers"}, {"nom": "Beurre", "unite": "g", "quantite": 20, "categorie": "Produits laitiers"}, {"nom": "Fruits de saison pour tremper", "unite": "g", "quantite": 400, "categorie": "Fruits & Légumes"}]	[{"duree": 420, "numero": 1, "vitesse": 2, "instruction": "Casser le chocolat en morceaux dans le bol. Ajouter la crème et le beurre.", "temperature": 50}, {"duree": 30, "numero": 2, "conseil": "Servir avec fraises, bananes, ananas et marshmallows.", "vitesse": 4, "instruction": "Mélanger jusqu'à obtenir une texture lisse."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.912517+00	2026-04-12 13:12:52.912517+00
3f4c07c4-e5f8-438a-8f62-eb23dccf022d	milkshake-fraise-cookexpert	\N	Milkshake fraise-vanille	Un milkshake gourmand aux fraises fraîches et glace vanille. Prêt en 3 minutes.	\N	\N	5	0	facile	4	{COOK_EXPERT}	{boisson,dessert}	{vegetarien,sans-gluten}	{milkshake,fraise,vanille,express}	220	C	Estimation indicative	[{"nom": "Fraises fraîches", "unite": "g", "quantite": 300, "categorie": "Fruits & Légumes"}, {"nom": "Glace vanille", "unite": "g", "quantite": 200, "categorie": "Surgelés"}, {"nom": "Lait entier", "unite": "ml", "quantite": 300, "categorie": "Produits laitiers"}, {"nom": "Sucre", "unite": "g", "quantite": 15, "categorie": "Épicerie"}]	[{"duree": 15, "numero": 1, "vitesse": 8, "instruction": "Mettre tous les ingrédients dans le bol du Cook Expert."}, {"duree": 30, "numero": 2, "vitesse": 12, "instruction": "Mixer à vitesse maximale."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.323164+00	2026-04-12 13:12:52.323164+00
fdefd72f-32de-4028-8a6c-70016b2cec57	chutney-mangue-cookexpert	\N	Chutney de mangue épicé	Un chutney sucré-salé pour accompagner vos currys, fromages ou grillades.	\N	\N	10	10	facile	4	{COOK_EXPERT}	{sauce,accompagnement}	{vegan,sans-gluten,sans-lactose}	{chutney,mangue,épicé,express}	95	B	Estimation indicative	[{"nom": "Mangue mûre", "unite": "g", "quantite": 300, "categorie": "Fruits & Légumes"}, {"nom": "Vinaigre de cidre", "unite": "ml", "quantite": 40, "categorie": "Condiments"}, {"nom": "Sucre roux", "unite": "g", "quantite": 50, "categorie": "Épicerie"}, {"nom": "Gingembre frais", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Piment", "unite": "pièce", "quantite": 0.5, "categorie": "Fruits & Légumes"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 7, "instruction": "Hacher le gingembre et le piment."}, {"duree": 600, "numero": 2, "conseil": "Laisser quelques morceaux pour la texture.", "vitesse": 2, "instruction": "Ajouter la mangue en morceaux, le vinaigre, le sucre et le sel. Cuire.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.536119+00	2026-04-12 13:12:52.536119+00
0ec09727-2bbe-4c2b-aa93-1e874c25d18b	quiche-lorraine-cookexpert	\N	Quiche lorraine	La quiche lorraine traditionnelle avec sa pâte brisée maison. Le Cook Expert pétrit la pâte.	\N	\N	15	25	moyen	4	{COOK_EXPERT}	{plat,entree}	{}	{quiche,lorraine,"pâte brisée",rapide}	420	C	Estimation indicative	[{"nom": "Farine", "unite": "g", "quantite": 250, "categorie": "Épicerie"}, {"nom": "Beurre froid", "unite": "g", "quantite": 125, "categorie": "Produits laitiers"}, {"nom": "Eau froide", "unite": "ml", "quantite": 50, "categorie": "Autre"}, {"nom": "Lardons", "unite": "g", "quantite": 200, "categorie": "Viandes & Poissons"}, {"nom": "Œufs", "unite": "pièce", "quantite": 3, "categorie": "Produits laitiers"}, {"nom": "Crème fraîche", "unite": "ml", "quantite": 200, "categorie": "Produits laitiers"}, {"nom": "Gruyère râpé", "unite": "g", "quantite": 80, "categorie": "Produits laitiers"}, {"nom": "Muscade", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 10, "numero": 1, "vitesse": 6, "instruction": "Mettre la farine et le beurre froid en cubes. Sabler."}, {"duree": 20, "numero": 2, "conseil": "La pâte doit être homogène mais pas trop travaillée.", "vitesse": 4, "instruction": "Ajouter l'eau et le sel. Pétrir brièvement."}, {"numero": 3, "instruction": "Étaler la pâte, foncer un moule. Mélanger œufs, crème, muscade. Disposer lardons et verser l'appareil. Saupoudrer de gruyère."}, {"numero": 4, "conseil": "Précuire la pâte à blanc 10 min si vous aimez un fond croustillant.", "instruction": "Enfourner 25 minutes à 200°C."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.770869+00	2026-04-12 13:12:52.770869+00
4e36779d-b031-40c1-89b7-c1764bcb58b2	taboulé-libanais-cookexpert	\N	Taboulé libanais au persil	Le vrai taboulé libanais, dominé par le persil frais et la menthe. Léger et parfumé.	\N	\N	20	0	facile	4	{COOK_EXPERT}	{entree,accompagnement}	{vegan,sans-lactose}	{taboulé,libanais,persil,rapide}	180	A	Estimation indicative	[{"nom": "Boulgour fin", "unite": "g", "quantite": 60, "categorie": "Épicerie"}, {"nom": "Persil plat frais", "unite": "g", "quantite": 100, "categorie": "Fruits & Légumes"}, {"nom": "Menthe fraîche", "unite": "g", "quantite": 30, "categorie": "Fruits & Légumes"}, {"nom": "Tomates", "unite": "g", "quantite": 200, "categorie": "Fruits & Légumes"}, {"nom": "Oignon nouveau", "unite": "pièce", "quantite": 3, "categorie": "Fruits & Légumes"}, {"nom": "Jus de citron", "unite": "ml", "quantite": 60, "categorie": "Fruits & Légumes"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 40, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"numero": 1, "instruction": "Tremper le boulgour 15 min dans l'eau chaude, puis égoutter."}, {"duree": 3, "numero": 2, "conseil": "Ne pas mixer fin, hacher par pulsions.", "vitesse": 4, "instruction": "Hacher le persil et la menthe grossièrement au Cook Expert."}, {"numero": 3, "conseil": "Réfrigérer 30 min avant de servir.", "instruction": "Mélanger dans un saladier avec les tomates en dés, les oignons émincés, le boulgour, le citron, l'huile et le sel."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.981634+00	2026-04-12 13:12:52.981634+00
fc3402bd-ffb7-4776-9a63-24081d2ade16	lasagnes-bolognaise-cookexpert	\N	Lasagnes à la bolognaise	Des lasagnes généreuses avec une bolognaise maison et une béchamel onctueuse. Le Cook Expert prépare les deux sauces.	\N	\N	20	40	moyen	4	{COOK_EXPERT}	{plat}	{}	{lasagnes,bolognaise,italien,gratin}	550	C	Estimation indicative	[{"nom": "Viande hachée", "unite": "g", "quantite": 400, "categorie": "Viandes & Poissons"}, {"nom": "Tomates concassées", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Carotte", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Lait", "unite": "ml", "quantite": 500, "categorie": "Produits laitiers"}, {"nom": "Beurre", "unite": "g", "quantite": 40, "categorie": "Produits laitiers"}, {"nom": "Farine", "unite": "g", "quantite": 40, "categorie": "Épicerie"}, {"nom": "Feuilles de lasagnes", "unite": "g", "quantite": 250, "categorie": "Épicerie"}, {"nom": "Gruyère râpé", "unite": "g", "quantite": 100, "categorie": "Produits laitiers"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 10, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Muscade", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Hacher l'oignon, l'ail et la carotte."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Ajouter l'huile et faire revenir.", "temperature": 120}, {"duree": 1200, "numero": 3, "vitesse": 1, "instruction": "Ajouter la viande hachée et les tomates. Cuire la bolognaise.", "temperature": 100}, {"duree": 420, "numero": 4, "vitesse": 4, "instruction": "Vider, nettoyer le bol. Préparer la béchamel : beurre, farine, lait, muscade.", "temperature": 90}, {"numero": 5, "instruction": "Monter les lasagnes en alternant pâtes, bolognaise, béchamel. Terminer par du gruyère."}, {"numero": 6, "conseil": "Laisser reposer 10 min avant de servir.", "instruction": "Enfourner 35 minutes à 190°C."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.184486+00	2026-04-12 13:12:53.184486+00
5e8f625c-fba2-4b61-bf19-52566fe7d142	soupe-butternut-cookexpert	\N	Soupe veloutée butternut-curry	Un velouté automnal au butternut rôti et curry doux. Onctueux et réconfortant.	\N	\N	10	25	facile	4	{COOK_EXPERT}	{soupe}	{vegan,sans-gluten,sans-lactose}	{butternut,curry,automne,rapide}	140	A	Estimation indicative	[{"nom": "Butternut", "unite": "g", "quantite": 600, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Lait de coco", "unite": "ml", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Bouillon de légumes", "unite": "ml", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Curry en poudre", "unite": "g", "quantite": 5, "categorie": "Condiments"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 10, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 180, "numero": 1, "vitesse": 1, "instruction": "Hacher l'oignon. Faire revenir avec l'huile et le curry.", "temperature": 120}, {"duree": 1200, "numero": 2, "vitesse": 1, "instruction": "Ajouter le butternut en cubes et le bouillon. Cuire.", "temperature": 100}, {"duree": 60, "numero": 3, "vitesse": 10, "instruction": "Ajouter le lait de coco. Mixer."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.053894+00	2026-04-12 13:12:53.053894+00
6ad217c2-19bc-45e0-b08a-3dae1fa4a125	fondant-chocolat-cookexpert	\N	Fondant au chocolat intense	Un fondant au cœur coulant, intense en chocolat. Le Cook Expert mélange la pâte à la perfection.	\N	\N	15	30	facile	4	{COOK_EXPERT}	{dessert}	{vegetarien,sans-gluten}	{chocolat,fondant,dessert,gourmand}	420	D	Riche en sucre et lipides	[{"nom": "Chocolat noir 70%", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Beurre", "unite": "g", "quantite": 100, "categorie": "Produits laitiers"}, {"nom": "Œufs", "unite": "pièce", "quantite": 3, "categorie": "Produits laitiers"}, {"nom": "Sucre", "unite": "g", "quantite": 80, "categorie": "Épicerie"}, {"nom": "Maïzena", "unite": "g", "quantite": 20, "categorie": "Épicerie"}]	[{"duree": 300, "numero": 1, "vitesse": 2, "instruction": "Faire fondre le chocolat et le beurre dans le bol.", "temperature": 50}, {"duree": 20, "numero": 2, "vitesse": 4, "instruction": "Ajouter les œufs et le sucre. Mélanger."}, {"duree": 10, "numero": 3, "vitesse": 3, "instruction": "Ajouter la maïzena. Mélanger brièvement."}, {"numero": 4, "conseil": "Le centre doit être encore tremblotant.", "instruction": "Verser dans des ramequins beurrés. Enfourner 12 minutes à 200°C."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.25235+00	2026-04-12 13:12:53.25235+00
970d55c8-a339-4e05-8f3e-672388053684	puree-patate-douce-companion	\N	Purée de patate douce	Une purée veloutée et colorée, naturellement sucrée. Parfaite en accompagnement.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/puree-patate-douce-companion.webp	\N	10	10	facile	4	{COMPANION}	{accompagnement}	{vegetarien,sans-gluten}	{purée,"patate douce",accompagnement,express}	170	A	Estimation indicative	[{"nom": "Patates douces", "unite": "g", "quantite": 600, "categorie": "Fruits & Légumes"}, {"nom": "Beurre", "unite": "g", "quantite": 30, "categorie": "Produits laitiers"}, {"nom": "Crème fraîche", "unite": "ml", "quantite": 50, "categorie": "Produits laitiers"}, {"nom": "Muscade", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 600, "numero": 1, "vitesse": 1, "accessoire": "panier", "instruction": "Éplucher et couper les patates douces en cubes. Cuire à la vapeur dans le panier.", "temperature": 100}, {"duree": 30, "numero": 2, "vitesse": 6, "instruction": "Transférer dans le bol avec le beurre, la crème et les assaisonnements. Mixer."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.655675+00	2026-04-13 10:36:11.404253+00
304ad196-af73-419f-b9aa-953ddf25e819	tajine-agneau-pruneaux-cookexpert	\N	Tajine d'agneau aux pruneaux	Un tajine sucré-salé parfumé aux épices marocaines. L'agneau fond dans la bouche après une cuisson douce.	\N	\N	15	50	moyen	4	{COOK_EXPERT}	{plat}	{sans-gluten,sans-lactose,halal}	{tajine,agneau,pruneaux,marocain}	480	B	Estimation indicative	[{"nom": "Épaule d'agneau", "unite": "g", "quantite": 600, "categorie": "Viandes & Poissons"}, {"nom": "Pruneaux dénoyautés", "unite": "g", "quantite": 150, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Miel", "unite": "g", "quantite": 30, "categorie": "Épicerie"}, {"nom": "Cannelle", "unite": "g", "quantite": 5, "categorie": "Condiments"}, {"nom": "Gingembre moulu", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Safran", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Amandes effilées", "unite": "g", "quantite": 30, "categorie": "Épicerie"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 20, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Eau", "unite": "ml", "quantite": 200, "categorie": "Autre"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Hacher les oignons."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Faire revenir avec l'huile et les épices.", "temperature": 120}, {"duree": 2400, "numero": 3, "vitesse": 1, "instruction": "Ajouter l'agneau en morceaux et l'eau. Mijoter.", "temperature": 100}, {"duree": 900, "numero": 4, "conseil": "Servir avec de la semoule et des amandes grillées.", "vitesse": 1, "instruction": "Ajouter les pruneaux et le miel. Poursuivre 15 min.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.120794+00	2026-04-12 13:12:53.120794+00
a3e61f3c-0faf-4356-8bf6-9003270ca728	couscous-royal-cookexpert	\N	Couscous royal complet	Le couscous traditionnel avec merguez, poulet et légumes. Le Cook Expert prépare le bouillon pendant que la semoule gonfle.	\N	\N	25	60	moyen	4	{COOK_EXPERT}	{plat}	{halal}	{couscous,royal,maghrébin,mijoté}	580	B	Estimation indicative	[{"nom": "Cuisses de poulet", "unite": "pièce", "quantite": 4, "categorie": "Viandes & Poissons"}, {"nom": "Merguez", "unite": "pièce", "quantite": 4, "categorie": "Viandes & Poissons"}, {"nom": "Courgettes", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Carottes", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Navet", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Pois chiches en boîte", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Tomates concassées", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Ras el hanout", "unite": "g", "quantite": 10, "categorie": "Condiments"}, {"nom": "Semoule moyenne", "unite": "g", "quantite": 300, "categorie": "Épicerie"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 20, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Eau", "unite": "ml", "quantite": 800, "categorie": "Autre"}]	[{"duree": 180, "numero": 1, "vitesse": 1, "instruction": "Hacher l'oignon. Faire revenir avec l'huile et le ras el hanout.", "temperature": 120}, {"duree": 2700, "numero": 2, "vitesse": 1, "instruction": "Ajouter le poulet, les légumes coupés en gros morceaux, les tomates et l'eau. Cuire.", "temperature": 100}, {"duree": 900, "numero": 3, "vitesse": 1, "instruction": "Ajouter les pois chiches et les merguez 15 min avant la fin.", "temperature": 100}, {"numero": 4, "instruction": "Préparer la semoule à part : verser de l'eau bouillante salée, couvrir 5 min, égrener à la fourchette avec un filet d'huile."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.315446+00	2026-04-12 13:12:53.315446+00
fba29f12-511f-4456-aa7e-3830ce4fa712	pate-a-tartiner-companion	\N	Pâte à tartiner chocolat-noisette	Une pâte à tartiner maison sans huile de palme. Le Companion broie les noisettes à la perfection.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/pate-a-tartiner-companion.webp	\N	10	5	facile	4	{COMPANION}	{petit-dejeuner,dessert}	{vegetarien,sans-gluten}	{"pâte à tartiner",chocolat,noisette,express}	310	D	Riche en sucre et lipides	[{"nom": "Noisettes torréfiées", "unite": "g", "quantite": 150, "categorie": "Épicerie"}, {"nom": "Chocolat au lait", "unite": "g", "quantite": 100, "categorie": "Épicerie"}, {"nom": "Huile de noisette", "unite": "ml", "quantite": 20, "categorie": "Épicerie"}, {"nom": "Sucre glace", "unite": "g", "quantite": 40, "categorie": "Épicerie"}, {"nom": "Cacao en poudre", "unite": "g", "quantite": 10, "categorie": "Épicerie"}]	[{"duree": 60, "numero": 1, "vitesse": 10, "instruction": "Broyer les noisettes en poudre fine."}, {"duree": 120, "numero": 2, "conseil": "Mixer jusqu'à obtenir une texture fluide et lisse.", "vitesse": 8, "instruction": "Ajouter le chocolat fondu, l'huile, le sucre et le cacao. Mixer."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.72027+00	2026-04-13 10:36:10.332041+00
47afdb5c-8505-4097-b3ad-daf03dece414	smoothie-bowl-acai-companion	\N	Smoothie bowl açaí	Un smoothie bowl coloré et nutritif, garni de fruits frais et granola.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/smoothie-bowl-acai-companion.webp	\N	10	0	facile	4	{COMPANION}	{petit-dejeuner,dessert}	{vegan,sans-gluten}	{"smoothie bowl",açaí,healthy,express}	210	A	Estimation indicative	[{"nom": "Pulpe d'açaí surgelée", "unite": "g", "quantite": 200, "categorie": "Surgelés"}, {"nom": "Banane surgelée", "unite": "g", "quantite": 200, "categorie": "Surgelés"}, {"nom": "Lait d'amande", "unite": "ml", "quantite": 100, "categorie": "Épicerie"}, {"nom": "Miel", "unite": "g", "quantite": 15, "categorie": "Épicerie"}, {"nom": "Granola", "unite": "g", "quantite": 60, "categorie": "Épicerie"}, {"nom": "Fruits frais", "unite": "g", "quantite": 100, "categorie": "Fruits & Légumes"}]	[{"duree": 30, "numero": 1, "vitesse": 10, "instruction": "Mettre l'açaí, la banane et le lait d'amande dans le bol."}, {"duree": 30, "numero": 2, "conseil": "La texture doit être épaisse comme un sorbet. Garnir de granola et fruits frais.", "vitesse": 12, "instruction": "Mixer à vitesse maximale."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.514144+00	2026-04-13 10:36:12.109428+00
c9d00b68-160e-4b88-8780-b48ecc5051b6	confit-canard-cookexpert	\N	Confit de canard maison	Un confit de canard fondant, cuit lentement dans sa graisse. Le Cook Expert maintient la température basse idéale.	\N	\N	15	120	difficile	4	{COOK_EXPERT}	{plat}	{sans-gluten,sans-lactose}	{canard,confit,sud-ouest,mijoté}	620	C	Riche en lipides	[{"nom": "Cuisses de canard confites", "unite": "pièce", "quantite": 4, "categorie": "Viandes & Poissons"}, {"nom": "Graisse de canard", "unite": "g", "quantite": 300, "categorie": "Viandes & Poissons"}, {"nom": "Pommes de terre", "unite": "g", "quantite": 600, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 4, "categorie": "Fruits & Légumes"}, {"nom": "Persil", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 300, "numero": 1, "vitesse": 1, "instruction": "Mettre la graisse de canard dans le bol. Chauffer doucement.", "temperature": 80}, {"duree": 5400, "numero": 2, "conseil": "Cuisson lente de 90 minutes minimum.", "vitesse": 1, "instruction": "Immerger les cuisses de canard dans la graisse. Confire à basse température.", "temperature": 80}, {"duree": 1200, "numero": 3, "vitesse": 1, "instruction": "Retirer les cuisses. Faire dorer les pommes de terre sarladaises avec l'ail et le persil dans la graisse.", "temperature": 120}, {"numero": 4, "conseil": "La peau doit être dorée et craquante.", "instruction": "Passer les cuisses au four 10 min à 220°C pour les croustiller."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.379711+00	2026-04-12 13:12:53.379711+00
82bbb25c-f1ac-43dc-b0d2-dfd33742ee1b	sauce-bechamel-companion	\N	Béchamel onctueuse	La béchamel parfaite sans grumeaux, le Companion touille en continu pour vous.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/sauce-bechamel-companion.webp	\N	5	10	facile	4	{COMPANION}	{sauce}	{vegetarien}	{béchamel,sauce,base,express}	160	C	Estimation indicative	[{"nom": "Lait", "unite": "ml", "quantite": 500, "categorie": "Produits laitiers"}, {"nom": "Beurre", "unite": "g", "quantite": 40, "categorie": "Produits laitiers"}, {"nom": "Farine", "unite": "g", "quantite": 40, "categorie": "Épicerie"}, {"nom": "Muscade", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 60, "numero": 1, "vitesse": 1, "instruction": "Mettre le beurre dans le bol. Faire fondre.", "temperature": 90}, {"duree": 60, "numero": 2, "vitesse": 3, "instruction": "Ajouter la farine. Cuire le roux.", "temperature": 90}, {"duree": 420, "numero": 3, "conseil": "Ajouter la muscade et le sel en fin de cuisson.", "vitesse": 4, "instruction": "Verser le lait progressivement. Cuire en remuant.", "temperature": 90}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.587454+00	2026-04-13 10:36:11.75369+00
a5f85490-26f4-4494-b03e-15281616e1c6	osso-buco-companion	\N	Osso buco à la milanaise	Un osso buco fondant aux légumes, mijoté lentement. La gremolata apporte la fraîcheur finale.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/069d6470-5a63-499e-b379-f99a9c40da8c/1776000622789.jpeg	\N	15	55	moyen	4	{COMPANION}	{plat}	{sans-gluten,sans-lactose}	{"osso buco",italien,veau,mijoté}	420	B	Estimation indicative	[{"nom": "Jarrets de veau (osso buco)", "unite": "pièce", "quantite": 4, "categorie": "Viandes & Poissons"}, {"nom": "Tomates concassées", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Carottes", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Céleri", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Vin blanc", "unite": "ml", "quantite": 150, "categorie": "Boissons"}, {"nom": "Bouillon de veau", "unite": "ml", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Citron (zeste)", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Persil", "unite": "g", "quantite": 10, "categorie": "Fruits & Légumes"}, {"nom": "Farine", "unite": "g", "quantite": 20, "categorie": "Épicerie"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 20, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 300, "numero": 1, "vitesse": 1, "instruction": "Fariner les jarrets. Faire dorer dans l'huile.", "temperature": 130}, {"duree": 5, "numero": 2, "vitesse": 5, "instruction": "Retirer la viande. Hacher oignon, carotte et céleri."}, {"duree": 180, "numero": 3, "vitesse": 1, "instruction": "Faire revenir les légumes.", "temperature": 120}, {"duree": 2700, "numero": 4, "vitesse": 1, "instruction": "Remettre la viande. Ajouter vin, tomates et bouillon. Mijoter.", "temperature": 100}, {"numero": 5, "conseil": "Servir avec du risotto alla milanese.", "instruction": "Préparer la gremolata : persil haché, zeste de citron et ail émincé. Parsemer au service."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:54.293774+00	2026-04-12 13:30:25.077778+00
84852963-0cc1-4522-a2b3-460734609af6	flan-patissier-companion	\N	Flan pâtissier parisien	Le flan pâtissier onctueux comme en boulangerie. Le Companion cuit la crème à la perfection.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/flan-patissier-companion.webp	\N	15	25	moyen	4	{COMPANION}	{dessert}	{vegetarien}	{flan,pâtissier,dessert,rapide}	320	C	Estimation indicative	[{"nom": "Lait entier", "unite": "ml", "quantite": 750, "categorie": "Produits laitiers"}, {"nom": "Œufs", "unite": "pièce", "quantite": 4, "categorie": "Produits laitiers"}, {"nom": "Sucre", "unite": "g", "quantite": 120, "categorie": "Épicerie"}, {"nom": "Maïzena", "unite": "g", "quantite": 60, "categorie": "Épicerie"}, {"nom": "Beurre", "unite": "g", "quantite": 20, "categorie": "Produits laitiers"}, {"nom": "Extrait de vanille", "unite": "ml", "quantite": 10, "categorie": "Épicerie"}, {"nom": "Pâte feuilletée", "unite": "pièce", "quantite": 1, "categorie": "Épicerie"}]	[{"duree": 300, "numero": 1, "vitesse": 2, "instruction": "Mettre le lait et la vanille dans le bol. Chauffer.", "temperature": 90}, {"numero": 2, "instruction": "Pendant ce temps, fouetter œufs, sucre et maïzena dans un bol à part."}, {"duree": 300, "numero": 3, "conseil": "La crème doit épaissir.", "vitesse": 4, "instruction": "Verser le lait chaud sur le mélange en fouettant. Remettre dans le bol du Companion.", "temperature": 90}, {"numero": 4, "conseil": "Le flan doit être doré sur le dessus.", "instruction": "Foncer un moule de pâte feuilletée. Verser la crème. Enfourner 40 min à 190°C."}]	\N	5.00	1	0	t	\N	t	2026-04-12 13:12:54.084134+00	2026-04-13 10:50:34.817732+00
b43459a5-5d28-4340-8161-865ad5c9660b	poulet-basquaise-companion	\N	Poulet basquaise	Le poulet basquaise aux poivrons et tomates, mijoté dans le Companion. Un classique du Sud-Ouest.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/poulet-basquaise-companion.webp	\N	15	25	facile	4	{COMPANION}	{plat}	{sans-gluten,sans-lactose,halal}	{poulet,basquaise,poivrons,rapide}	350	A	Estimation indicative	[{"nom": "Cuisses de poulet", "unite": "pièce", "quantite": 4, "categorie": "Viandes & Poissons"}, {"nom": "Poivrons", "unite": "pièce", "quantite": 3, "categorie": "Fruits & Légumes"}, {"nom": "Tomates", "unite": "g", "quantite": 400, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Piment d'Espelette", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 15, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Hacher l'oignon et l'ail."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Faire revenir avec l'huile.", "temperature": 130}, {"duree": 1200, "numero": 3, "vitesse": 1, "instruction": "Ajouter le poulet, les poivrons en lanières, les tomates et le piment. Cuire au programme Mijotage.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.86416+00	2026-04-13 10:36:11.073114+00
756127db-376c-4b80-9b46-4709da2e5e27	chili-con-carne-companion	\N	Chili con carne texan	Un chili généreux aux haricots rouges et épices fumées. Le Companion mijote tout en douceur.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/069d6470-5a63-499e-b379-f99a9c40da8c/1776000468283.jpeg	\N	10	40	facile	4	{COMPANION}	{plat}	{sans-gluten,sans-lactose}	{chili,mexicain,haricots,épicé}	390	A	Estimation indicative	[{"nom": "Viande hachée de bœuf", "unite": "g", "quantite": 400, "categorie": "Viandes & Poissons"}, {"nom": "Haricots rouges en boîte", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Tomates concassées", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Poivron rouge", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Cumin", "unite": "g", "quantite": 5, "categorie": "Condiments"}, {"nom": "Paprika fumé", "unite": "g", "quantite": 5, "categorie": "Condiments"}, {"nom": "Piment en poudre", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 15, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 5, "instruction": "Hacher l'oignon et l'ail."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Faire revenir avec l'huile et les épices.", "temperature": 120}, {"duree": 300, "numero": 3, "vitesse": 1, "instruction": "Ajouter la viande hachée et faire dorer.", "temperature": 120}, {"duree": 1800, "numero": 4, "conseil": "Servir avec du riz ou des tortillas.", "vitesse": 1, "instruction": "Ajouter les tomates, les haricots et le poivron en dés. Mijoter.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:54.435978+00	2026-04-12 13:27:50.253861+00
77e85d38-2244-4f7d-ada5-aa0cf702e9c3	gratin-courgettes-chevre-companion	\N	Gratin de courgettes au chèvre	Un gratin léger et fondant au chèvre frais. Simple et savoureux.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/069d6470-5a63-499e-b379-f99a9c40da8c/1776000735554.jpeg	\N	10	25	facile	4	{COMPANION}	{plat,accompagnement}	{vegetarien,sans-gluten}	{gratin,courgette,chèvre,rapide}	220	B	Estimation indicative	[{"nom": "Courgettes", "unite": "g", "quantite": 600, "categorie": "Fruits & Légumes"}, {"nom": "Chèvre frais", "unite": "g", "quantite": 150, "categorie": "Produits laitiers"}, {"nom": "Œufs", "unite": "pièce", "quantite": 2, "categorie": "Produits laitiers"}, {"nom": "Crème fraîche", "unite": "ml", "quantite": 100, "categorie": "Produits laitiers"}, {"nom": "Thym", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 600, "numero": 1, "vitesse": 1, "accessoire": "panier", "instruction": "Couper les courgettes en rondelles. Cuire à la vapeur.", "temperature": 100}, {"numero": 2, "instruction": "Mélanger les œufs, la crème, le chèvre émietté, le thym, sel et poivre dans un bol."}, {"numero": 3, "instruction": "Disposer les courgettes dans un plat à gratin. Verser l'appareil. Enfourner 25 min à 200°C."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:54.22517+00	2026-04-12 13:32:18.240615+00
352896bc-22e7-423c-b7c7-909788baaf10	cassoulet-companion	\N	Cassoulet toulousain	Le cassoulet généreux aux haricots blancs, saucisse de Toulouse et confit de canard. Un plat qui réchauffe l'âme.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/069d6470-5a63-499e-b379-f99a9c40da8c/1776000128724.jpeg	\N	20	90	moyen	4	{COMPANION}	{plat}	{}	{cassoulet,toulouse,mijoté,sud-ouest}	650	C	Estimation indicative	[{"nom": "Haricots blancs secs (trempés)", "unite": "g", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Saucisse de Toulouse", "unite": "g", "quantite": 400, "categorie": "Viandes & Poissons"}, {"nom": "Cuisses de canard confites", "unite": "pièce", "quantite": 2, "categorie": "Viandes & Poissons"}, {"nom": "Lardons", "unite": "g", "quantite": 100, "categorie": "Viandes & Poissons"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Ail", "unite": "pièce", "quantite": 3, "categorie": "Fruits & Légumes"}, {"nom": "Tomates concassées", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Bouquet garni", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Chapelure", "unite": "g", "quantite": 50, "categorie": "Épicerie"}, {"nom": "Eau", "unite": "ml", "quantite": 600, "categorie": "Autre"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 300, "numero": 1, "vitesse": 1, "instruction": "Faire revenir les lardons et l'oignon haché.", "temperature": 120}, {"duree": 4500, "numero": 2, "conseil": "Cuisson longue de 75 minutes.", "vitesse": 1, "instruction": "Ajouter les haricots égouttés, la saucisse coupée, les tomates, l'ail, le bouquet garni et l'eau.", "temperature": 100}, {"numero": 3, "conseil": "Casser la croûte une fois, renfourner 10 min.", "instruction": "Transférer dans un plat en terre. Disposer le confit de canard, saupoudrer de chapelure. Enfourner 20 min à 200°C."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:54.577035+00	2026-04-12 13:22:11.323701+00
34768d39-4f77-4b2c-bf3a-e6f34a707404	moelleux-caramel-beurre-sale-companion	\N	Moelleux au caramel beurre salé	Un gâteau ultra moelleux au cœur caramel. Le Companion mélange la pâte en 2 minutes.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/069d6470-5a63-499e-b379-f99a9c40da8c/1776000541124.jpeg	\N	15	30	facile	4	{COMPANION}	{dessert}	{vegetarien}	{moelleux,caramel,"beurre salé",breton}	380	D	Riche en sucre	[{"nom": "Farine", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Sucre", "unite": "g", "quantite": 120, "categorie": "Épicerie"}, {"nom": "Œufs", "unite": "pièce", "quantite": 3, "categorie": "Produits laitiers"}, {"nom": "Beurre demi-sel", "unite": "g", "quantite": 100, "categorie": "Produits laitiers"}, {"nom": "Caramel beurre salé", "unite": "g", "quantite": 100, "categorie": "Épicerie"}, {"nom": "Levure chimique", "unite": "g", "quantite": 8, "categorie": "Épicerie"}, {"nom": "Lait", "unite": "ml", "quantite": 50, "categorie": "Produits laitiers"}]	[{"duree": 120, "numero": 1, "vitesse": 1, "instruction": "Faire fondre le beurre.", "temperature": 60}, {"duree": 30, "numero": 2, "vitesse": 5, "instruction": "Ajouter les œufs, le sucre, la farine, la levure et le lait. Mélanger."}, {"numero": 3, "conseil": "Ne pas mélanger le caramel, il doit rester en poches.", "instruction": "Verser dans un moule beurré. Déposer des cuillerées de caramel sur le dessus. Enfourner 30 min à 180°C."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:54.367854+00	2026-04-12 13:29:03.442667+00
e06c7805-6733-4691-91d2-8a8f51d34a3a	pad-thai-crevettes-companion	\N	Pad thaï aux crevettes	Le classique thaïlandais aux crevettes, nouilles de riz et sauce tamarin. Prêt en 25 minutes.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/pad-thai-crevettes-companion.webp	\N	10	15	facile	4	{COMPANION}	{plat}	{sans-lactose}	{"pad thaï",crevettes,thaïlandais,rapide}	340	B	Estimation indicative	[{"nom": "Crevettes décortiquées", "unite": "g", "quantite": 300, "categorie": "Viandes & Poissons"}, {"nom": "Nouilles de riz", "unite": "g", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Œufs", "unite": "pièce", "quantite": 2, "categorie": "Produits laitiers"}, {"nom": "Pousses de soja", "unite": "g", "quantite": 100, "categorie": "Fruits & Légumes"}, {"nom": "Oignon vert", "unite": "pièce", "quantite": 3, "categorie": "Fruits & Légumes"}, {"nom": "Cacahuètes concassées", "unite": "g", "quantite": 30, "categorie": "Épicerie"}, {"nom": "Sauce soja", "unite": "ml", "quantite": 30, "categorie": "Condiments"}, {"nom": "Sauce poisson (nuoc mam)", "unite": "ml", "quantite": 15, "categorie": "Condiments"}, {"nom": "Sucre de palme", "unite": "g", "quantite": 15, "categorie": "Épicerie"}, {"nom": "Citron vert", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Huile", "unite": "ml", "quantite": 15, "categorie": "Épicerie"}]	[{"numero": 1, "instruction": "Réhydrater les nouilles dans l'eau chaude 10 min. Égoutter."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Faire sauter les crevettes dans l'huile.", "temperature": 130}, {"duree": 300, "numero": 3, "vitesse": 1, "instruction": "Ajouter les œufs battus, les nouilles, la sauce soja, le nuoc mam et le sucre. Mélanger.", "temperature": 100}, {"numero": 4, "instruction": "Servir avec pousses de soja, oignons verts, cacahuètes et citron vert."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:54.151073+00	2026-04-13 10:36:09.264218+00
a10d7a0e-20da-4cfc-8739-7f5e2adb9f5b	creme-brulee-companion	\N	Crème brûlée vanille	Une crème brûlée soyeuse à la vanille. Le Companion mélange et cuit l'appareil à la température parfaite.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/creme-brulee-companion.webp	\N	10	25	moyen	4	{COMPANION}	{dessert}	{vegetarien,sans-gluten}	{"crème brûlée",vanille,dessert,rapide}	290	C	Estimation indicative	[{"nom": "Crème liquide entière", "unite": "ml", "quantite": 500, "categorie": "Produits laitiers"}, {"nom": "Jaunes d'œufs", "unite": "pièce", "quantite": 5, "categorie": "Produits laitiers"}, {"nom": "Sucre", "unite": "g", "quantite": 80, "categorie": "Épicerie"}, {"nom": "Gousse de vanille", "unite": "pièce", "quantite": 1, "categorie": "Épicerie"}, {"nom": "Cassonade", "unite": "g", "quantite": 40, "categorie": "Épicerie"}]	[{"duree": 300, "numero": 1, "vitesse": 2, "instruction": "Chauffer la crème avec la gousse de vanille fendue.", "temperature": 90}, {"numero": 2, "conseil": "Mélanger hors Thermomix à la main.", "instruction": "Fouetter les jaunes avec le sucre dans un bol à part. Verser la crème chaude en filet."}, {"numero": 3, "instruction": "Répartir dans des ramequins. Cuire au bain-marie au four 30 min à 150°C."}, {"numero": 4, "conseil": "Servir immédiatement après le caramel.", "instruction": "Réfrigérer 4h. Saupoudrer de cassonade et caraméliser au chalumeau."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.931064+00	2026-04-13 10:36:09.610326+00
4b220968-d1b4-464e-85a0-afa9406a5e4f	poele-gnocchis-companion	\N	Poêlée de gnocchis aux légumes grillés	Des gnocchis dorés avec légumes du soleil, pesto et parmesan. Simple et savoureux.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/poele-gnocchis-companion.webp	\N	10	20	facile	4	{COMPANION}	{plat}	{vegetarien}	{gnocchis,légumes,pesto,rapide}	380	B	Estimation indicative	[{"nom": "Gnocchis", "unite": "g", "quantite": 500, "categorie": "Épicerie"}, {"nom": "Courgette", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Tomates cerises", "unite": "g", "quantite": 200, "categorie": "Fruits & Légumes"}, {"nom": "Pesto", "unite": "g", "quantite": 40, "categorie": "Épicerie"}, {"nom": "Parmesan", "unite": "g", "quantite": 30, "categorie": "Produits laitiers"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 15, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 300, "numero": 1, "vitesse": 1, "accessoire": "spatule", "instruction": "Faire revenir les gnocchis dans l'huile.", "temperature": 130}, {"duree": 480, "numero": 2, "vitesse": 1, "instruction": "Ajouter la courgette en dés et les tomates cerises coupées en deux.", "temperature": 100}, {"duree": 30, "numero": 3, "vitesse": 1, "instruction": "Hors feu, ajouter le pesto et le parmesan."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.997527+00	2026-04-13 10:36:10.724564+00
d33174df-25d3-452b-b1b2-7c07d3d5465a	soupe-carotte-gingembre-companion	\N	Soupe carotte-gingembre	Un velouté vitaminé et épicé, parfait pour l'hiver. Le Companion cuit et mixe en un programme.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/soupe-carotte-gingembre-companion.webp	\N	10	10	facile	4	{COMPANION}	{soupe,entree}	{vegan,sans-gluten,sans-lactose}	{carotte,gingembre,soupe,express}	110	A	Estimation indicative	[{"nom": "Carottes", "unite": "g", "quantite": 500, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Gingembre frais", "unite": "g", "quantite": 15, "categorie": "Fruits & Légumes"}, {"nom": "Bouillon de légumes", "unite": "ml", "quantite": 500, "categorie": "Épicerie"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 10, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 5, "numero": 1, "vitesse": 8, "instruction": "Hacher l'oignon et le gingembre."}, {"duree": 120, "numero": 2, "vitesse": 1, "instruction": "Ajouter l'huile et faire revenir.", "temperature": 130}, {"duree": 480, "numero": 3, "vitesse": 1, "instruction": "Ajouter les carottes en rondelles et le bouillon. Cuire au programme Soupe P1.", "temperature": 100}, {"duree": 60, "numero": 4, "vitesse": 12, "instruction": "Mixer."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.447688+00	2026-04-13 10:36:12.437388+00
6d587587-bed6-4218-934e-c0d9595ff62a	soupe-potiron-companion	\N	Velouté de potiron au cumin	Un velouté automnal doux et épicé. Le potiron donne une texture naturellement onctueuse.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/soupe-potiron-companion.webp	\N	10	10	facile	4	{COMPANION}	{soupe}	{vegan,sans-gluten,sans-lactose}	{potiron,cumin,automne,express}	100	A	Estimation indicative	[{"nom": "Potiron", "unite": "g", "quantite": 500, "categorie": "Fruits & Légumes"}, {"nom": "Oignon", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Bouillon de légumes", "unite": "ml", "quantite": 400, "categorie": "Épicerie"}, {"nom": "Cumin", "unite": "g", "quantite": 3, "categorie": "Condiments"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 10, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"duree": 120, "numero": 1, "vitesse": 1, "instruction": "Hacher l'oignon. Faire revenir avec l'huile et le cumin.", "temperature": 120}, {"duree": 480, "numero": 2, "vitesse": 1, "instruction": "Ajouter le potiron en cubes et le bouillon. Cuire.", "temperature": 100}, {"duree": 60, "numero": 3, "vitesse": 10, "instruction": "Mixer."}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:53.794752+00	2026-04-13 10:36:12.784264+00
6307b03f-dab6-48f2-8715-89adcc6b732f	pot-au-feu-companion	\N	Pot-au-feu traditionnel	Le pot-au-feu familial avec viande de bœuf, légumes d'hiver et bouillon parfumé.	https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/069d6470-5a63-499e-b379-f99a9c40da8c/1776000354019.jpeg	\N	20	90	facile	4	{COMPANION}	{plat}	{sans-gluten,sans-lactose}	{pot-au-feu,bœuf,hiver,mijoté}	420	A	Estimation indicative	[{"nom": "Plat de côtes de bœuf", "unite": "g", "quantite": 600, "categorie": "Viandes & Poissons"}, {"nom": "Poireaux", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Carottes", "unite": "pièce", "quantite": 3, "categorie": "Fruits & Légumes"}, {"nom": "Navets", "unite": "pièce", "quantite": 2, "categorie": "Fruits & Légumes"}, {"nom": "Pommes de terre", "unite": "pièce", "quantite": 4, "categorie": "Fruits & Légumes"}, {"nom": "Oignon piqué de clous de girofle", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Bouquet garni", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Gros sel", "unite": "g", "quantite": 10, "categorie": "Condiments"}, {"nom": "Eau", "unite": "ml", "quantite": 1500, "categorie": "Autre"}]	[{"duree": 600, "numero": 1, "vitesse": 1, "instruction": "Mettre la viande et l'eau froide dans le bol. Porter à ébullition.", "temperature": 100}, {"duree": 3600, "numero": 2, "vitesse": 1, "instruction": "Écumer. Ajouter l'oignon piqué, le bouquet garni et le sel. Cuire.", "temperature": 100}, {"duree": 1800, "numero": 3, "vitesse": 1, "instruction": "Ajouter les légumes coupés en gros morceaux.", "temperature": 100}, {"numero": 4, "conseil": "Le bouillon peut être servi en entrée.", "instruction": "Servir la viande et les légumes avec de la moutarde, des cornichons et du gros sel."}]	\N	5.00	1	0	t	\N	t	2026-04-12 13:12:54.505938+00	2026-04-14 19:34:16.775746+00
136e3aeb-5275-4b5a-a709-48c3544d8fb2	boeuf-bourguignon-thermomix	\N	Bœuf bourguignon mijoté	Le grand classique bourguignon, mijoté lentement pour une viande fondante. Le Thermomix gère la cuisson longue sans surveillance.	\N	\N	20	90	moyen	4	{TM6,TM7}	{plat}	{}	{bœuf,bourguignon,mijoté,français,hiver}	480	B	Estimation indicative	[{"nom": "Bœuf à braiser (paleron)", "unite": "g", "quantite": 800, "categorie": "Viandes & Poissons"}, {"nom": "Vin rouge Bourgogne", "unite": "ml", "quantite": 500, "categorie": "Boissons"}, {"nom": "Lardons fumés", "unite": "g", "quantite": 100, "categorie": "Viandes & Poissons"}, {"nom": "Carottes", "unite": "g", "quantite": 200, "categorie": "Fruits & Légumes"}, {"nom": "Oignons grelots", "unite": "g", "quantite": 200, "categorie": "Fruits & Légumes"}, {"nom": "Champignons de Paris", "unite": "g", "quantite": 200, "categorie": "Fruits & Légumes"}, {"nom": "Bouillon de bœuf", "unite": "ml", "quantite": 200, "categorie": "Épicerie"}, {"nom": "Concentré de tomates", "unite": "g", "quantite": 30, "categorie": "Épicerie"}, {"nom": "Farine", "unite": "g", "quantite": 20, "categorie": "Épicerie"}, {"nom": "Bouquet garni", "unite": "pièce", "quantite": 1, "categorie": "Fruits & Légumes"}, {"nom": "Huile d'olive", "unite": "ml", "quantite": 20, "categorie": "Condiments"}, {"nom": "Sel", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}, {"nom": "Poivre", "unite": "pincée", "quantite": 1, "categorie": "Condiments"}]	[{"numero": 1, "conseil": "Sécher la viande avec du papier absorbant avant de fariner.", "instruction": "Couper le bœuf en gros cubes. Fariner légèrement."}, {"duree": 180, "numero": 2, "vitesse": 1, "instruction": "Mettre l'huile dans le bol et faire dorer les lardons.", "temperature": 120}, {"duree": 300, "numero": 3, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter la viande et saisir.", "temperature": 120}, {"duree": 4800, "numero": 4, "conseil": "Cuisson longue : 80 minutes de mijotage.", "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter les carottes en rondelles, les oignons, le concentré de tomates, le vin rouge, le bouillon et le bouquet garni.", "temperature": 100}, {"duree": 900, "numero": 5, "vitesse": 1, "accessoire": "spatule", "instruction": "Ajouter les champignons 15 minutes avant la fin.", "temperature": 100}]	\N	0.00	0	0	t	\N	t	2026-04-12 13:12:52.126556+00	2026-04-14 22:15:17.60135+00
\.


--
-- Data for Name: recipe_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_comments (id, user_id, recette_id, content, rating, approved, parent_id, created_at, updated_at, image_url) FROM stdin;
6be58d1b-c368-40ad-9269-1e4598b2f8df	8149b8cb-a842-45a3-accc-e38f2f401655	352896bc-22e7-423c-b7c7-909788baaf10	adfl;gkm;l vksdfz	\N	t	\N	2026-04-14 22:07:43.750674+00	2026-04-14 22:07:43.750674+00	\N
\.


--
-- Data for Name: recipe_ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_ratings (id, user_id, recette_id, rating, created_at, updated_at) FROM stdin;
9edbff11-d601-4029-9637-c74048db82a2	069d6470-5a63-499e-b379-f99a9c40da8c	84852963-0cc1-4522-a2b3-460734609af6	5	2026-04-13 10:50:31.606552+00	2026-04-13 10:50:34.817732+00
169097da-b4b5-4e72-9be5-ccb7efa27c7e	8149b8cb-a842-45a3-accc-e38f2f401655	6307b03f-dab6-48f2-8715-89adcc6b732f	5	2026-04-14 19:34:13.289952+00	2026-04-14 19:34:16.775746+00
\.


--
-- Data for Name: submission_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.submission_log (id, user_id, submitted_at) FROM stdin;
acf04922-f015-4373-82f4-5c324de8686e	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 08:33:05.555768+00
0c48f3c4-75f9-40f8-8552-3cf97981cef4	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 14:24:14.268606+00
fad61c87-e9c4-4ec3-9cdf-de24212392a2	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-11 10:09:51.403049+00
f46fbc76-50ce-4daa-bff7-438b921b07ff	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 10:08:15.58666+00
f34111c0-b648-4c87-bb9c-41a4d50e0210	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 10:13:49.719976+00
4918e0c2-8796-410a-b3f4-03fed1662c07	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-13 10:02:31.114574+00
\.


--
-- Data for Name: suppression_feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppression_feedbacks (id, user_id, raison, created_at) FROM stdin;
facf2546-211c-4cbe-9ce6-8ce3cb7c6a74	\N	parce que t'es un fils	2026-04-05 19:01:43.332384+00
\.


--
-- Data for Name: user_achievements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_achievements (id, user_id, achievement_code, unlocked_at, notified) FROM stdin;
51a216f1-86a6-416c-ba48-03ae9747f364	069d6470-5a63-499e-b379-f99a9c40da8c	first_login	2026-04-11 22:13:18.55821+00	t
0ec22285-3e2f-4e35-b05e-7007d7fe003b	069d6470-5a63-499e-b379-f99a9c40da8c	plan_1	2026-04-11 22:14:07.324075+00	t
e323b7fe-625c-4fb5-832f-b20f55068273	069d6470-5a63-499e-b379-f99a9c40da8c	comment_approved_1	2026-04-12 10:05:13.692469+00	t
14b53c0e-f3f8-4ccf-8c33-ff38b230241c	069d6470-5a63-499e-b379-f99a9c40da8c	comment_approved_10	2026-04-12 10:05:13.771223+00	t
4aa7f3f7-eade-4f59-bd73-36eee05d5678	069d6470-5a63-499e-b379-f99a9c40da8c	recipe_submit_1	2026-04-12 10:08:15.797872+00	t
4010760d-ebef-48db-9ac0-1663c0c0bae2	069d6470-5a63-499e-b379-f99a9c40da8c	nutriscore_1	2026-04-12 10:08:15.89556+00	t
29012f07-073d-421b-bc66-03d10de962a7	069d6470-5a63-499e-b379-f99a9c40da8c	recipe_approved_1	2026-04-12 10:14:06.842217+00	t
0800d83c-55b8-4ba3-bb1c-671f78b85fed	069d6470-5a63-499e-b379-f99a9c40da8c	fav_1	2026-04-12 19:46:46.614214+00	t
449e7892-b43e-47eb-9a8a-873b2938588d	8149b8cb-a842-45a3-accc-e38f2f401655	first_login	2026-04-13 09:15:32.072888+00	t
e8403745-7e1c-4988-a629-66fd204fd539	069d6470-5a63-499e-b379-f99a9c40da8c	recipe_with_photo	2026-04-13 10:02:31.356275+00	t
f39ba318-e74e-4278-832a-092c7a989228	069d6470-5a63-499e-b379-f99a9c40da8c	rating_1	2026-04-13 10:50:31.893574+00	t
eeb8ab95-bc07-4581-834b-035c836f0cf4	389c5d94-48f9-44d1-a271-4581593837c7	first_login	2026-04-14 11:06:05.249961+00	t
44a6e0c6-2f09-4f0b-9d8a-ae0621a3a2ff	389c5d94-48f9-44d1-a271-4581593837c7	plan_1	2026-04-14 19:24:38.573344+00	t
f1ccf8f9-7465-46b6-b0af-a5e3d8b6fe44	389c5d94-48f9-44d1-a271-4581593837c7	avatar_set	2026-04-14 19:24:55.524754+00	t
9a85a2f2-e617-42a7-ae88-4d961fcf69b9	8149b8cb-a842-45a3-accc-e38f2f401655	plan_1	2026-04-14 19:33:14.365802+00	t
308e0291-15bf-4d81-8365-b4e97e877073	8149b8cb-a842-45a3-accc-e38f2f401655	rating_1	2026-04-14 19:34:13.581797+00	t
be21cce9-70b1-44f6-a642-27fbe5419604	8149b8cb-a842-45a3-accc-e38f2f401655	fav_1	2026-04-14 19:34:35.061353+00	t
b6269ae9-13ea-4024-b913-f6442ebb6071	8149b8cb-a842-45a3-accc-e38f2f401655	avatar_set	2026-04-14 22:57:55.360474+00	t
\.


--
-- Data for Name: user_plannings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_plannings (id, user_id, name, description, is_public, week_start, data, likes_count, created_at, updated_at) FROM stdin;
b58331a2-24e6-4e93-a980-7e0dff0a56eb	069d6470-5a63-499e-b379-f99a9c40da8c	zebbbbiiiiiiii	oui zebbi	t	2026-04-05	{"0": ["41919f91-ab7f-47fe-b0ba-4abb84e05f4f", "4244c23b-3f02-4c4e-bd91-3566652742d2", "97ebd825-4384-40ca-a618-a52c2246b51a"], "1": ["4244c23b-3f02-4c4e-bd91-3566652742d2", "4244c23b-3f02-4c4e-bd91-3566652742d2", "8320a6df-2b9b-45d5-9933-065dd840e21d"], "2": ["97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "3": ["4244c23b-3f02-4c4e-bd91-3566652742d2", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "4": ["4244c23b-3f02-4c4e-bd91-3566652742d2", null, null], "5": ["6deab28f-36a7-42ad-91d3-e7a8f464e92f", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "6": ["97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a"]}	0	2026-04-11 22:14:07.07833+00	2026-04-11 22:14:07.07833+00
3c5e33f5-cce1-424a-bae5-566fbd4c97fb	069d6470-5a63-499e-b379-f99a9c40da8c	ilophane pareil	zebbi oui	f	2026-04-05	{"0": ["41919f91-ab7f-47fe-b0ba-4abb84e05f4f", "4244c23b-3f02-4c4e-bd91-3566652742d2", "97ebd825-4384-40ca-a618-a52c2246b51a"], "1": ["4244c23b-3f02-4c4e-bd91-3566652742d2", "4244c23b-3f02-4c4e-bd91-3566652742d2", "8320a6df-2b9b-45d5-9933-065dd840e21d"], "2": ["97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "3": ["4244c23b-3f02-4c4e-bd91-3566652742d2", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "4": ["4244c23b-3f02-4c4e-bd91-3566652742d2", null, null], "5": ["6deab28f-36a7-42ad-91d3-e7a8f464e92f", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "6": ["97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a"]}	0	2026-04-11 22:14:23.996182+00	2026-04-11 22:14:23.996182+00
9b687d3b-2b90-4033-ab05-04fa706a53ce	069d6470-5a63-499e-b379-f99a9c40da8c	ablucher	bababadidoubabou	f	2026-04-05	{"0": ["41919f91-ab7f-47fe-b0ba-4abb84e05f4f", "4244c23b-3f02-4c4e-bd91-3566652742d2", "97ebd825-4384-40ca-a618-a52c2246b51a"], "1": ["4244c23b-3f02-4c4e-bd91-3566652742d2", "4244c23b-3f02-4c4e-bd91-3566652742d2", "8320a6df-2b9b-45d5-9933-065dd840e21d"], "2": ["97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "3": ["4244c23b-3f02-4c4e-bd91-3566652742d2", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "4": ["4244c23b-3f02-4c4e-bd91-3566652742d2", null, null], "5": ["6deab28f-36a7-42ad-91d3-e7a8f464e92f", "97ebd825-4384-40ca-a618-a52c2246b51a", null], "6": ["97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a", "97ebd825-4384-40ca-a618-a52c2246b51a"]}	0	2026-04-12 09:56:41.299228+00	2026-04-12 09:56:41.299228+00
ff485c21-6970-4646-b1bc-cf9d6c522e80	389c5d94-48f9-44d1-a271-4581593837c7	caca boudin	\N	f	2026-04-12	{"0": [null, null, null], "1": ["243edfe5-0857-4026-be9a-5570335f7b66", null, null], "2": [null, null, null], "3": ["eeace966-f522-45a9-b1fa-fd7460f307cf", null, null], "4": [null, null, null], "5": ["5ddbf6ab-b669-447d-94ef-362631eda280", null, null], "6": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null]}	0	2026-04-14 19:24:38.40917+00	2026-04-14 19:24:38.40917+00
cf846641-5bec-4d72-8215-f82bc4141638	8149b8cb-a842-45a3-accc-e38f2f401655	test	\N	f	2026-04-12	{"0": [null, null, null], "1": [null, null, null], "2": ["843ecad3-0d20-4ea4-b345-6a7d93590fd3", null, null], "3": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "4": ["c08e4855-b08d-4b7a-b4bc-94938571fe76", null, null], "5": ["e06c7805-6733-4691-91d2-8a8f51d34a3a", null, null], "6": [null, null, null]}	0	2026-04-14 19:33:14.069124+00	2026-04-14 19:33:14.069124+00
82b924bf-ec65-4fb2-ac0e-d9e20da5d4cd	8149b8cb-a842-45a3-accc-e38f2f401655	uuu	\N	f	2026-04-12	{"0": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "1": ["6307b03f-dab6-48f2-8715-89adcc6b732f", null, null], "2": ["843ecad3-0d20-4ea4-b345-6a7d93590fd3", null, null], "3": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "4": ["c08e4855-b08d-4b7a-b4bc-94938571fe76", null, null], "5": ["e06c7805-6733-4691-91d2-8a8f51d34a3a", null, null], "6": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null]}	0	2026-04-14 19:57:46.42351+00	2026-04-14 19:57:46.42351+00
d7e4b2e1-843f-433a-8229-fab0a5603d84	8149b8cb-a842-45a3-accc-e38f2f401655	rstshtgar	\N	f	2026-04-12	{"0": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "1": ["6307b03f-dab6-48f2-8715-89adcc6b732f", null, null], "2": ["843ecad3-0d20-4ea4-b345-6a7d93590fd3", null, null], "3": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "4": ["c08e4855-b08d-4b7a-b4bc-94938571fe76", null, null], "5": ["e06c7805-6733-4691-91d2-8a8f51d34a3a", null, null], "6": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null]}	0	2026-04-14 20:36:27.900721+00	2026-04-14 20:36:27.900721+00
ef4a61d1-6394-4897-a93d-f87face0d4ef	069d6470-5a63-499e-b379-f99a9c40da8c	srehhtrhrrt	\N	f	2026-04-12	{"0": [null, null, null], "1": ["84852963-0cc1-4522-a2b3-460734609af6", null, null], "2": ["84852963-0cc1-4522-a2b3-460734609af6", null, null], "3": ["f7588f31-9e3f-43b4-b308-760aafb7a58e", "84852963-0cc1-4522-a2b3-460734609af6", null], "4": ["7147a4e1-34ed-4fd1-b144-f6e538ad95a9", null, null], "5": [null, null, null], "6": [null, null, null]}	0	2026-04-14 21:07:53.552421+00	2026-04-14 21:07:53.552421+00
a79c996f-d3c8-4c3c-b08c-8fdf8daa2cba	069d6470-5a63-499e-b379-f99a9c40da8c	zebbi nommi	\N	f	2026-04-12	{"0": ["a5f85490-26f4-4494-b03e-15281616e1c6", null, null], "1": ["84852963-0cc1-4522-a2b3-460734609af6", "1f4cf79d-3fc0-4128-9fa0-6206806a2e92", null], "2": ["84852963-0cc1-4522-a2b3-460734609af6", "84852963-0cc1-4522-a2b3-460734609af6", null], "3": ["f7588f31-9e3f-43b4-b308-760aafb7a58e", "84852963-0cc1-4522-a2b3-460734609af6", null], "4": ["7147a4e1-34ed-4fd1-b144-f6e538ad95a9", null, null], "5": ["34768d39-4f77-4b2c-bf3a-e6f34a707404", null, null], "6": ["77e85d38-2244-4f7d-ada5-aa0cf702e9c3", null, null]}	0	2026-04-14 21:48:32.70812+00	2026-04-14 21:48:32.70812+00
544d7d0a-4d4f-4f73-9fb5-776fbad06a5b	069d6470-5a63-499e-b379-f99a9c40da8c	hatchoune	\N	t	2026-04-12	{"0": ["a5f85490-26f4-4494-b03e-15281616e1c6", null, null], "1": ["84852963-0cc1-4522-a2b3-460734609af6", "1f4cf79d-3fc0-4128-9fa0-6206806a2e92", null], "2": ["84852963-0cc1-4522-a2b3-460734609af6", "84852963-0cc1-4522-a2b3-460734609af6", null], "3": ["f7588f31-9e3f-43b4-b308-760aafb7a58e", "84852963-0cc1-4522-a2b3-460734609af6", null], "4": ["7147a4e1-34ed-4fd1-b144-f6e538ad95a9", null, null], "5": ["34768d39-4f77-4b2c-bf3a-e6f34a707404", null, null], "6": ["77e85d38-2244-4f7d-ada5-aa0cf702e9c3", null, null]}	0	2026-04-14 21:48:54.130839+00	2026-04-14 21:48:54.130839+00
8820427e-1b29-4450-b359-3330669d2869	069d6470-5a63-499e-b379-f99a9c40da8c	dzkjhlak	\N	f	2026-04-12	{"0": ["a5f85490-26f4-4494-b03e-15281616e1c6", "84852963-0cc1-4522-a2b3-460734609af6", "34768d39-4f77-4b2c-bf3a-e6f34a707404"], "1": ["84852963-0cc1-4522-a2b3-460734609af6", "1f4cf79d-3fc0-4128-9fa0-6206806a2e92", null], "2": ["84852963-0cc1-4522-a2b3-460734609af6", "84852963-0cc1-4522-a2b3-460734609af6", null], "3": ["f7588f31-9e3f-43b4-b308-760aafb7a58e", "84852963-0cc1-4522-a2b3-460734609af6", null], "4": ["7147a4e1-34ed-4fd1-b144-f6e538ad95a9", null, null], "5": ["34768d39-4f77-4b2c-bf3a-e6f34a707404", "756127db-376c-4b80-9b46-4709da2e5e27", null], "6": ["77e85d38-2244-4f7d-ada5-aa0cf702e9c3", null, null]}	0	2026-04-14 22:12:54.666719+00	2026-04-14 22:12:54.666719+00
0612598e-1c59-4418-a83b-47bff3ee0505	8149b8cb-a842-45a3-accc-e38f2f401655	mbhngojyk	\N	f	2026-04-12	{"0": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "1": ["6307b03f-dab6-48f2-8715-89adcc6b732f", null, null], "2": ["843ecad3-0d20-4ea4-b345-6a7d93590fd3", "352896bc-22e7-423c-b7c7-909788baaf10", null], "3": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "4": ["c08e4855-b08d-4b7a-b4bc-94938571fe76", null, null], "5": ["e06c7805-6733-4691-91d2-8a8f51d34a3a", null, null], "6": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null]}	0	2026-04-14 22:18:00.462954+00	2026-04-14 22:18:00.462954+00
bbe98467-7ab4-430a-a54f-53b658cc486d	8149b8cb-a842-45a3-accc-e38f2f401655	kjnlkh	\N	f	2026-04-12	{"0": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null], "1": ["6307b03f-dab6-48f2-8715-89adcc6b732f", null, null], "2": ["843ecad3-0d20-4ea4-b345-6a7d93590fd3", null, null], "3": ["352896bc-22e7-423c-b7c7-909788baaf10", "352896bc-22e7-423c-b7c7-909788baaf10", null], "4": ["c08e4855-b08d-4b7a-b4bc-94938571fe76", null, null], "5": ["e06c7805-6733-4691-91d2-8a8f51d34a3a", "352896bc-22e7-423c-b7c7-909788baaf10", null], "6": ["352896bc-22e7-423c-b7c7-909788baaf10", null, null]}	0	2026-04-14 23:39:55.50751+00	2026-04-14 23:39:55.50751+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-04-04 19:42:07
20211116045059	2026-04-04 19:42:07
20211116050929	2026-04-04 19:42:07
20211116051442	2026-04-04 19:42:07
20211116212300	2026-04-04 19:42:07
20211116213355	2026-04-04 19:42:07
20211116213934	2026-04-04 19:42:07
20211116214523	2026-04-04 19:42:07
20211122062447	2026-04-04 19:42:07
20211124070109	2026-04-04 19:42:07
20211202204204	2026-04-04 19:42:07
20211202204605	2026-04-04 19:42:07
20211210212804	2026-04-04 19:42:07
20211228014915	2026-04-04 19:42:07
20220107221237	2026-04-04 19:42:07
20220228202821	2026-04-04 19:42:07
20220312004840	2026-04-04 19:42:07
20220603231003	2026-04-04 19:42:07
20220603232444	2026-04-04 19:42:07
20220615214548	2026-04-04 19:42:07
20220712093339	2026-04-04 19:42:07
20220908172859	2026-04-04 19:42:07
20220916233421	2026-04-04 19:42:07
20230119133233	2026-04-04 19:42:07
20230128025114	2026-04-04 19:42:07
20230128025212	2026-04-04 19:42:07
20230227211149	2026-04-04 19:42:07
20230228184745	2026-04-04 19:42:07
20230308225145	2026-04-04 19:42:07
20230328144023	2026-04-04 19:42:07
20231018144023	2026-04-04 19:42:07
20231204144023	2026-04-04 19:42:07
20231204144024	2026-04-04 19:42:07
20231204144025	2026-04-04 19:42:07
20240108234812	2026-04-04 19:42:07
20240109165339	2026-04-04 19:42:07
20240227174441	2026-04-04 19:42:07
20240311171622	2026-04-04 19:42:07
20240321100241	2026-04-04 19:42:07
20240401105812	2026-04-04 19:42:07
20240418121054	2026-04-04 19:42:07
20240523004032	2026-04-04 19:42:07
20240618124746	2026-04-04 19:42:07
20240801235015	2026-04-04 19:42:07
20240805133720	2026-04-04 19:42:07
20240827160934	2026-04-04 19:42:07
20240919163303	2026-04-04 19:42:07
20240919163305	2026-04-04 19:42:07
20241019105805	2026-04-04 19:42:08
20241030150047	2026-04-04 19:42:08
20241108114728	2026-04-04 19:42:08
20241121104152	2026-04-04 19:42:08
20241130184212	2026-04-04 19:42:08
20241220035512	2026-04-04 19:42:08
20241220123912	2026-04-04 19:42:08
20241224161212	2026-04-04 19:42:08
20250107150512	2026-04-04 19:42:08
20250110162412	2026-04-04 19:42:08
20250123174212	2026-04-04 19:42:08
20250128220012	2026-04-04 19:42:08
20250506224012	2026-04-04 19:42:08
20250523164012	2026-04-04 19:42:08
20250714121412	2026-04-04 19:42:08
20250905041441	2026-04-04 19:42:08
20251103001201	2026-04-04 19:42:08
20251120212548	2026-04-04 19:42:08
20251120215549	2026-04-04 19:42:08
20260218120000	2026-04-04 19:42:08
20260326120000	2026-04-13 21:47:28
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
recettes-images	recettes-images	\N	2026-04-04 20:27:33.186319+00	2026-04-04 20:27:33.186319+00	t	f	\N	\N	\N	STANDARD
avatars	avatars	\N	2026-04-06 11:17:15.403741+00	2026-04-06 11:17:15.403741+00	t	f	\N	\N	\N	STANDARD
comment-images	comment-images	\N	2026-04-07 06:17:13.646351+00	2026-04-07 06:17:13.646351+00	t	f	\N	\N	\N	STANDARD
recette-images	recette-images	\N	2026-04-13 10:12:25.907548+00	2026-04-13 10:12:25.907548+00	t	f	409600	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-04-04 19:42:10.346319
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-04-04 19:42:10.35172
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-04-04 19:42:10.356245
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-04-04 19:42:10.368018
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-04-04 19:42:10.37463
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-04-04 19:42:10.377463
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-04-04 19:42:10.38098
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-04-04 19:42:10.384868
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-04-04 19:42:10.387751
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-04-04 19:42:10.391858
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-04-04 19:42:10.395601
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-04-04 19:42:10.398466
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-04-04 19:42:10.401824
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-04-04 19:42:10.405548
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-04-04 19:42:10.408858
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-04-04 19:42:10.428329
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-04-04 19:42:10.431789
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-04-04 19:42:10.434484
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-04-04 19:42:10.438258
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-04-04 19:42:10.442714
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-04-04 19:42:10.445555
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-04-04 19:42:10.449806
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-04-04 19:42:10.459341
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-04-04 19:42:10.466977
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-04-04 19:42:10.46985
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-04-04 19:42:10.472731
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-04-04 19:42:10.475704
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-04-04 19:42:10.478078
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-04-04 19:42:10.480475
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-04-04 19:42:10.482748
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-04-04 19:42:10.48517
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-04-04 19:42:10.487605
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-04-04 19:42:10.490225
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-04-04 19:42:10.49268
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-04-04 19:42:10.495137
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-04-04 19:42:10.497589
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-04-04 19:42:10.500172
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-04-04 19:42:10.502555
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-04-04 19:42:10.506028
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-04-04 19:42:10.512636
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-04-04 19:42:10.515098
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-04-04 19:42:10.517481
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-04-04 19:42:10.519993
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-04-04 19:42:10.52245
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-04-04 19:42:10.524888
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-04-04 19:42:10.52837
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-04-04 19:42:10.536216
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-04-04 19:42:10.539357
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-04-04 19:42:10.542028
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-04-04 19:42:10.556052
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-04-04 19:42:10.559303
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-04-04 19:42:11.388673
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-04-04 19:42:11.390243
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-04-04 19:42:11.397656
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-04-04 19:42:11.399845
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-04-04 19:42:11.401382
56	fix-optimized-search-function	cb58526ebc23048049fd5bf2fd148d18b04a2073	2026-04-04 19:42:11.404725
57	s3-multipart-uploads-metadata	f127886e00d1b374fadbc7c6b31e09336aad5287	2026-04-06 17:14:31.415603
58	operation-ergonomics	00ca5d483b3fe0d522133d9002ccc5df98365120	2026-04-06 17:14:31.448004
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
c604e99a-c7a1-4444-bf86-0696acad91c0	recettes-images	ce8cf438-9598-4338-8fa2-db100c260f52/1775461757371.jpg	ce8cf438-9598-4338-8fa2-db100c260f52	2026-04-06 07:49:18.182845+00	2026-04-06 07:49:18.182845+00	2026-04-06 07:49:18.182845+00	{"eTag": "\\"5d62a6f0d585115a931939f7440f6b77\\"", "size": 381687, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T07:49:19.000Z", "contentLength": 381687, "httpStatusCode": 200}	42e5c1f2-bd8d-461b-997e-21dc07cdfe94	ce8cf438-9598-4338-8fa2-db100c260f52	{}
1d80c087-8d0b-4c28-8f17-85a0911bbfca	avatars	218b9f37-92e3-4aa5-9125-f0e64a2e2d42-0.5665225423576017.webp	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	2026-04-14 10:37:07.130133+00	2026-04-14 10:37:07.130133+00	2026-04-14 10:37:07.130133+00	{"eTag": "\\"be45f6aa669f7e43b19287b8e9e65ee3\\"", "size": 58042, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T10:37:08.000Z", "contentLength": 58042, "httpStatusCode": 200}	33d2b87f-9d59-40de-97d1-ab2b73445617	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	{}
41e0fb22-6976-4eec-9a1e-d050d596160c	recettes-images	ce8cf438-9598-4338-8fa2-db100c260f52/1775463660782.jpg	ce8cf438-9598-4338-8fa2-db100c260f52	2026-04-06 08:21:01.310332+00	2026-04-06 08:21:01.310332+00	2026-04-06 08:21:01.310332+00	{"eTag": "\\"5d62a6f0d585115a931939f7440f6b77\\"", "size": 381687, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T08:21:02.000Z", "contentLength": 381687, "httpStatusCode": 200}	5810bac0-d687-4f90-a59d-09647d6c22d0	ce8cf438-9598-4338-8fa2-db100c260f52	{}
9c6213d0-9572-4be3-8e43-01dc5b2f173f	recettes-images	recettes/0.21598169077640383-1775469000359.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 09:50:01.053605+00	2026-04-06 09:50:01.053605+00	2026-04-06 09:50:01.053605+00	{"eTag": "\\"11c88881f2875e4fe58e45317b4d67e6\\"", "size": 116890, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T09:50:02.000Z", "contentLength": 116890, "httpStatusCode": 200}	65c2de24-ef30-4453-a12d-a800ae6f2ed6	069d6470-5a63-499e-b379-f99a9c40da8c	{}
a8a79f8d-aa09-4083-bd13-0ad50b236988	recettes-images	recettes/0.651139221474567-1775470192261.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 10:09:52.776578+00	2026-04-06 10:09:52.776578+00	2026-04-06 10:09:52.776578+00	{"eTag": "\\"0eaca8749851e6fc1d5862ec761f1102\\"", "size": 808106, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T10:09:53.000Z", "contentLength": 808106, "httpStatusCode": 200}	4fcf49ce-3c99-49f6-97a3-cab85f8169e4	069d6470-5a63-499e-b379-f99a9c40da8c	{}
0e85c443-6c74-42fa-b433-52e745dcfa1f	recettes-images	recettes/0.560860729877652-1775470316096.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 10:11:56.421403+00	2026-04-06 10:11:56.421403+00	2026-04-06 10:11:56.421403+00	{"eTag": "\\"35ae3f64f6797f5305b129a97abdb679\\"", "size": 117462, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T10:11:57.000Z", "contentLength": 117462, "httpStatusCode": 200}	6714d064-4a15-41fb-ab32-2a910b83d433	069d6470-5a63-499e-b379-f99a9c40da8c	{}
7f5da7ef-f605-4ef4-a204-5658fd2bf777	recettes-images	recettes/0.2803161571402101-1775470316538.png	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 10:11:57.959413+00	2026-04-06 10:11:57.959413+00	2026-04-06 10:11:57.959413+00	{"eTag": "\\"bef1e81f9cdcf3273a1192e5ed3de109\\"", "size": 4322471, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T10:11:58.000Z", "contentLength": 4322471, "httpStatusCode": 200}	7c303b19-a272-4c4f-a5fb-315b0f80db23	069d6470-5a63-499e-b379-f99a9c40da8c	{}
c112d943-5ead-4a12-9bff-8df458684f78	avatars	069d6470-5a63-499e-b379-f99a9c40da8c-0.32343535279393365.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 11:27:04.977857+00	2026-04-06 11:27:04.977857+00	2026-04-06 11:27:04.977857+00	{"eTag": "\\"2830bd16c07ac061123e3dfebdf7ea0c\\"", "size": 58256, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T11:27:05.000Z", "contentLength": 58256, "httpStatusCode": 200}	fdd1dd27-9b03-4df4-ba16-3b2ffaaa56d0	069d6470-5a63-499e-b379-f99a9c40da8c	{}
0aad0f1a-a0b0-4abf-b1bb-a67bd061d493	avatars	069d6470-5a63-499e-b379-f99a9c40da8c-0.6053187322144797.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 18:51:10.21096+00	2026-04-06 18:51:10.21096+00	2026-04-06 18:51:10.21096+00	{"eTag": "\\"9dab0f0fd6741e92c11b065f32ea3b12\\"", "size": 84938, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T18:51:11.000Z", "contentLength": 84938, "httpStatusCode": 200}	0f1d3c23-e463-427f-b498-f7af88d7beb1	069d6470-5a63-499e-b379-f99a9c40da8c	{}
80c8539b-64c9-4523-a95a-823af6074270	avatars	069d6470-5a63-499e-b379-f99a9c40da8c-0.9960556061051801.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 18:51:24.395942+00	2026-04-06 18:51:24.395942+00	2026-04-06 18:51:24.395942+00	{"eTag": "\\"4de3f4cdf6cba69b1ed5d4750917f04d\\"", "size": 5450, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T18:51:25.000Z", "contentLength": 5450, "httpStatusCode": 200}	3d8fc5c8-a1fd-43bb-869c-0b04ac21fc65	069d6470-5a63-499e-b379-f99a9c40da8c	{}
b5d9ac84-eccd-4bd6-a4bf-fd9d1a49d603	avatars	ce8cf438-9598-4338-8fa2-db100c260f52-0.876420366252644.webp	ce8cf438-9598-4338-8fa2-db100c260f52	2026-04-06 19:15:32.099305+00	2026-04-06 19:15:32.099305+00	2026-04-06 19:15:32.099305+00	{"eTag": "\\"da2481c197d48d87293d763e2d18dd2b\\"", "size": 44162, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T19:15:33.000Z", "contentLength": 44162, "httpStatusCode": 200}	7c25e6e8-7483-47c9-b716-f6c743e8075e	ce8cf438-9598-4338-8fa2-db100c260f52	{}
3f07e681-8992-401c-8d02-413cc80f0933	recettes-images	recettes/0.9562358772836458-1775508722039.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 20:52:02.467609+00	2026-04-06 20:52:02.467609+00	2026-04-06 20:52:02.467609+00	{"eTag": "\\"54e9c87cd37be04bc6d159383da56584\\"", "size": 111178, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T20:52:03.000Z", "contentLength": 111178, "httpStatusCode": 200}	8be9bfcd-a09c-40aa-9d99-9750f34f4e4a	069d6470-5a63-499e-b379-f99a9c40da8c	{}
ace86698-8b0b-4e84-aa64-92ef19012914	avatars	218b9f37-92e3-4aa5-9125-f0e64a2e2d42-0.9279754625683426.webp	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	2026-04-14 10:49:56.102088+00	2026-04-14 10:49:56.102088+00	2026-04-14 10:49:56.102088+00	{"eTag": "\\"fd03ef62ff78bbc04abbeeefe8ebffb6\\"", "size": 53164, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T10:49:57.000Z", "contentLength": 53164, "httpStatusCode": 200}	fce08257-9ab9-4c5f-b829-ca7f7ef0833c	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	{}
83a751dd-3fde-4fb7-9276-d321dbb8e5de	recettes-images	recettes/0.8465627233668279-1775508722489.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-06 20:52:02.882279+00	2026-04-06 20:52:02.882279+00	2026-04-06 20:52:02.882279+00	{"eTag": "\\"4731291145f06c9e8bff69d8927e99bd\\"", "size": 193159, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T20:52:03.000Z", "contentLength": 193159, "httpStatusCode": 200}	80b7a1ee-c2ef-4b1c-b33a-631440d4208f	069d6470-5a63-499e-b379-f99a9c40da8c	{}
7750065e-d15d-4951-85bc-3717a24c12b5	avatars	069d6470-5a63-499e-b379-f99a9c40da8c-0.47153607549552834.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-07 05:53:24.499514+00	2026-04-07 05:53:24.499514+00	2026-04-07 05:53:24.499514+00	{"eTag": "\\"d1115be4552b3137dc41ddce5e675b8b\\"", "size": 103710, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T05:53:25.000Z", "contentLength": 103710, "httpStatusCode": 200}	a8456341-3351-4574-80bd-2d331f91c1d1	069d6470-5a63-499e-b379-f99a9c40da8c	{}
2df90af1-49ac-4653-b6b7-2200038eaaad	comment-images	069d6470-5a63-499e-b379-f99a9c40da8c/1775543703354.png	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-07 06:35:03.75325+00	2026-04-07 06:35:03.75325+00	2026-04-07 06:35:03.75325+00	{"eTag": "\\"ca42c0d524869847ddd7ace18dd254fe\\"", "size": 172857, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T06:35:04.000Z", "contentLength": 172857, "httpStatusCode": 200}	c7c8f2e1-0f0f-46cb-93a6-6ec5dd6845da	069d6470-5a63-499e-b379-f99a9c40da8c	{}
77a9fadf-7022-447b-a007-aef49d7fa0b1	recettes-images	recettes/0.9441201918418682-1775600113530.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-07 22:15:13.879016+00	2026-04-07 22:15:13.879016+00	2026-04-07 22:15:13.879016+00	{"eTag": "\\"9908acaf92fe4cdecaedeed41f0b4398\\"", "size": 41800, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T22:15:14.000Z", "contentLength": 41800, "httpStatusCode": 200}	bc3a5695-57ca-4acb-b723-06acc6553561	069d6470-5a63-499e-b379-f99a9c40da8c	{}
aa76a48f-5958-4735-90de-6287784f46db	recettes-images	recettes/0.2840386071608011-1775600113980.jpg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-07 22:15:14.207566+00	2026-04-07 22:15:14.207566+00	2026-04-07 22:15:14.207566+00	{"eTag": "\\"021f602c1bb45500a1f55a683a45f2a1\\"", "size": 48761, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T22:15:15.000Z", "contentLength": 48761, "httpStatusCode": 200}	adfc44be-0d50-4ff3-9d36-41de9ae55cec	069d6470-5a63-499e-b379-f99a9c40da8c	{}
a633e7d1-1d7b-4ef7-ab35-b7f995f14e09	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1775637183929.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 08:33:04.433856+00	2026-04-08 08:33:04.433856+00	2026-04-08 08:33:04.433856+00	{"eTag": "\\"4b831d084975ca9d7818fffa487b7a83\\"", "size": 99112, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T08:33:05.000Z", "contentLength": 99112, "httpStatusCode": 200}	63c6f7b9-183e-49ab-b98b-c6b8016f9134	069d6470-5a63-499e-b379-f99a9c40da8c	{}
17783d44-6105-4aba-8699-25fc1bdf4a0a	recettes-images	recettes/0.6345065630549943-1775637373777.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 08:36:14.078469+00	2026-04-08 08:36:14.078469+00	2026-04-08 08:36:14.078469+00	{"eTag": "\\"4f188e61ea0cd185bd25cbd560443a8a\\"", "size": 260884, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T08:36:14.000Z", "contentLength": 260884, "httpStatusCode": 200}	b52b6ab0-add2-43c6-abf2-c4271437cf3c	069d6470-5a63-499e-b379-f99a9c40da8c	{}
864d5cd3-b0ef-4a1e-a769-c81893e008da	recettes-images	recettes/0.5779743149455623-1775637374132.jpg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 08:36:14.525114+00	2026-04-08 08:36:14.525114+00	2026-04-08 08:36:14.525114+00	{"eTag": "\\"21f504c721450df15f0448be8fd23209\\"", "size": 378400, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T08:36:15.000Z", "contentLength": 378400, "httpStatusCode": 200}	1b0e565b-85e0-4f51-aed6-990a31aa0ace	069d6470-5a63-499e-b379-f99a9c40da8c	{}
943eca0a-e982-4cf9-a6c7-6570d785d5c1	avatars	218b9f37-92e3-4aa5-9125-f0e64a2e2d42-0.47528903265501954.webp	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	2026-04-14 10:50:16.437915+00	2026-04-14 10:50:16.437915+00	2026-04-14 10:50:16.437915+00	{"eTag": "\\"ecf5273fe3be927817ba38a92927c407\\"", "size": 9868, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T10:50:17.000Z", "contentLength": 9868, "httpStatusCode": 200}	45f214d7-98ef-414e-89a6-1d845ceb8a63	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	{}
286779bf-0416-4c2b-956c-e40f58b397a4	avatars	218b9f37-92e3-4aa5-9125-f0e64a2e2d42-0.6766457421110825.webp	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	2026-04-14 10:50:47.93116+00	2026-04-14 10:50:47.93116+00	2026-04-14 10:50:47.93116+00	{"eTag": "\\"f0a5a5e90401e46dda5b29037a71e28f\\"", "size": 103578, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T10:50:48.000Z", "contentLength": 103578, "httpStatusCode": 200}	ebc67423-a3a0-4e87-94ca-568b95c66cb0	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	{}
b86cd947-2f82-41fb-adc2-d9bf551c4c5c	recettes-images	recettes/0.25637387479485463-1775637380418.webp	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 08:36:20.620101+00	2026-04-08 08:36:20.620101+00	2026-04-08 08:36:20.620101+00	{"eTag": "\\"1fa41775f7d12b1a18d9411a2464485e\\"", "size": 96924, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T08:36:21.000Z", "contentLength": 96924, "httpStatusCode": 200}	01f8a898-a2d1-4415-ab93-c7b9478ca079	069d6470-5a63-499e-b379-f99a9c40da8c	{}
5ee55628-607a-4374-acfb-0fbd06e49455	avatars	389c5d94-48f9-44d1-a271-4581593837c7-0.5634091032900617.webp	389c5d94-48f9-44d1-a271-4581593837c7	2026-04-14 19:24:53.812552+00	2026-04-14 19:24:53.812552+00	2026-04-14 19:24:53.812552+00	{"eTag": "\\"be45f6aa669f7e43b19287b8e9e65ee3\\"", "size": 58042, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T19:24:54.000Z", "contentLength": 58042, "httpStatusCode": 200}	9a91a97b-6b85-4505-9e84-f675e4e55af4	389c5d94-48f9-44d1-a271-4581593837c7	{}
47892500-0142-4806-99da-b1cdb6a7b29c	recettes-images	recettes/0.9599789716734388-1775637380647.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 08:36:20.901178+00	2026-04-08 08:36:20.901178+00	2026-04-08 08:36:20.901178+00	{"eTag": "\\"4b831d084975ca9d7818fffa487b7a83\\"", "size": 99112, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T08:36:21.000Z", "contentLength": 99112, "httpStatusCode": 200}	29dadfaf-bce6-428f-b76a-0ada83837ebf	069d6470-5a63-499e-b379-f99a9c40da8c	{}
a25bc16b-4385-4235-836b-463b3fe27f2c	comment-images	069d6470-5a63-499e-b379-f99a9c40da8c/1775637498625.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 08:38:18.965144+00	2026-04-08 08:38:18.965144+00	2026-04-08 08:38:18.965144+00	{"eTag": "\\"4b831d084975ca9d7818fffa487b7a83\\"", "size": 99112, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T08:38:19.000Z", "contentLength": 99112, "httpStatusCode": 200}	8c7098aa-ddc0-42df-b81a-b4aa26fef224	069d6470-5a63-499e-b379-f99a9c40da8c	{}
a57c429f-40df-4d38-b0ad-bc7da7e8131b	comment-images	069d6470-5a63-499e-b379-f99a9c40da8c/1775657625976.jpg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 14:13:46.449541+00	2026-04-08 14:13:46.449541+00	2026-04-08 14:13:46.449541+00	{"eTag": "\\"7015d2276086bfa96ce5f104a6118213\\"", "size": 151969, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T14:13:47.000Z", "contentLength": 151969, "httpStatusCode": 200}	84031198-e5ba-413b-ae89-09b6233c732f	069d6470-5a63-499e-b379-f99a9c40da8c	{}
957ec3e4-8c93-4263-a20e-60af463b6fa3	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1775658252762.jpg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 14:24:13.262281+00	2026-04-08 14:24:13.262281+00	2026-04-08 14:24:13.262281+00	{"eTag": "\\"7015d2276086bfa96ce5f104a6118213\\"", "size": 151969, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T14:24:14.000Z", "contentLength": 151969, "httpStatusCode": 200}	22b8abda-b52e-4576-985b-796ef2ff2133	069d6470-5a63-499e-b379-f99a9c40da8c	{}
1b1a7d15-7933-4d7d-b635-82942bf74271	comment-images	ce8cf438-9598-4338-8fa2-db100c260f52/1775659762928.jpg	ce8cf438-9598-4338-8fa2-db100c260f52	2026-04-08 14:49:23.37414+00	2026-04-08 14:49:23.37414+00	2026-04-08 14:49:23.37414+00	{"eTag": "\\"7015d2276086bfa96ce5f104a6118213\\"", "size": 151969, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T14:49:24.000Z", "contentLength": 151969, "httpStatusCode": 200}	202c38e4-b60d-46f3-aa2a-6243fd38eb1a	ce8cf438-9598-4338-8fa2-db100c260f52	{}
5db85116-7b88-4a95-8195-2d1e5df818b3	comment-images	ce8cf438-9598-4338-8fa2-db100c260f52/1775676485518.jpg	ce8cf438-9598-4338-8fa2-db100c260f52	2026-04-08 19:28:05.988702+00	2026-04-08 19:28:05.988702+00	2026-04-08 19:28:05.988702+00	{"eTag": "\\"7015d2276086bfa96ce5f104a6118213\\"", "size": 151969, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T19:28:06.000Z", "contentLength": 151969, "httpStatusCode": 200}	24ce6d1f-49ed-4cae-bf19-871ac59ed80f	ce8cf438-9598-4338-8fa2-db100c260f52	{}
b3d4c691-adb0-4b69-963f-78b51a8d8592	comment-images	069d6470-5a63-499e-b379-f99a9c40da8c/1775681058279.jpg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-08 20:44:18.795851+00	2026-04-08 20:44:18.795851+00	2026-04-08 20:44:18.795851+00	{"eTag": "\\"7015d2276086bfa96ce5f104a6118213\\"", "size": 151969, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T20:44:19.000Z", "contentLength": 151969, "httpStatusCode": 200}	6c39fcf4-dcc1-489e-b7ac-7a0979e28502	069d6470-5a63-499e-b379-f99a9c40da8c	{}
5bf7970c-9f97-4273-ae04-205669eb6952	comment-images	069d6470-5a63-499e-b379-f99a9c40da8c/1775902908811.png	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-11 10:21:53.019213+00	2026-04-11 10:21:53.019213+00	2026-04-11 10:21:53.019213+00	{"eTag": "\\"a89f3c181cb78af262ba7c78e1415b95\\"", "size": 2713144, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-11T10:21:53.000Z", "contentLength": 2713144, "httpStatusCode": 200}	c4ecfd28-eb2a-4eb7-9697-288003b0d579	069d6470-5a63-499e-b379-f99a9c40da8c	{}
c5ffec3c-b29d-4a94-a2fb-cd7762ecb557	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776000128724.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 13:22:09.184048+00	2026-04-12 13:22:09.184048+00	2026-04-12 13:22:09.184048+00	{"eTag": "\\"e7c8c3126779b7f290eea291a7ec035a\\"", "size": 154697, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T13:22:10.000Z", "contentLength": 154697, "httpStatusCode": 200}	df15cdd2-2b2f-4a52-85f4-f13381fb4dae	069d6470-5a63-499e-b379-f99a9c40da8c	{}
7ca3b3a2-5a0d-4b62-845c-f2f66180bda0	avatars	8149b8cb-a842-45a3-accc-e38f2f401655-0.932560471037056.webp	8149b8cb-a842-45a3-accc-e38f2f401655	2026-04-14 22:57:53.643866+00	2026-04-14 22:57:53.643866+00	2026-04-14 22:57:53.643866+00	{"eTag": "\\"fd76099fdf460194c2db00df6c0b9936\\"", "size": 54750, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T22:57:54.000Z", "contentLength": 54750, "httpStatusCode": 200}	0ddc2c5f-98e3-4af7-ba91-dd284da083fc	8149b8cb-a842-45a3-accc-e38f2f401655	{}
f6e75f37-4422-40d0-be2f-b737a4535747	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776000354019.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 13:25:54.36252+00	2026-04-12 13:25:54.36252+00	2026-04-12 13:25:54.36252+00	{"eTag": "\\"b1926f381d555c4a41946d55d7311b01\\"", "size": 161092, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T13:25:55.000Z", "contentLength": 161092, "httpStatusCode": 200}	892364de-d248-42d7-90b0-aac76f34ecf9	069d6470-5a63-499e-b379-f99a9c40da8c	{}
58aa7bf8-5437-4fde-9fe3-9cff41af9dc7	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776000468283.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 13:27:48.771047+00	2026-04-12 13:27:48.771047+00	2026-04-12 13:27:48.771047+00	{"eTag": "\\"45aa7e051f9ce7a9e271ae8c76cb073f\\"", "size": 199606, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T13:27:49.000Z", "contentLength": 199606, "httpStatusCode": 200}	908ac8c3-3f8c-4162-b4c4-457a5a83ca66	069d6470-5a63-499e-b379-f99a9c40da8c	{}
0016ff74-d00e-4d2b-9137-9cbaf173d389	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776000541124.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 13:29:01.685328+00	2026-04-12 13:29:01.685328+00	2026-04-12 13:29:01.685328+00	{"eTag": "\\"3ada87d8a07ab07e31ee4a2b9e3e03c5\\"", "size": 156195, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T13:29:02.000Z", "contentLength": 156195, "httpStatusCode": 200}	658043d9-e6f5-4123-9df2-06bc30587b5b	069d6470-5a63-499e-b379-f99a9c40da8c	{}
8bb874c3-df94-4d21-879d-7f5d50e9dd38	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776000622789.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 13:30:23.286534+00	2026-04-12 13:30:23.286534+00	2026-04-12 13:30:23.286534+00	{"eTag": "\\"ab7ee51958fd27b6bfa0caca77e487e7\\"", "size": 147342, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T13:30:24.000Z", "contentLength": 147342, "httpStatusCode": 200}	e319b2e6-4f6a-4904-89a1-aa6e1b2cb37c	069d6470-5a63-499e-b379-f99a9c40da8c	{}
7fced9fe-cc16-40c9-bf71-3f84a01abc1d	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776000696490.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 13:31:36.781738+00	2026-04-12 13:31:36.781738+00	2026-04-12 13:31:36.781738+00	{"eTag": "\\"ab7ee51958fd27b6bfa0caca77e487e7\\"", "size": 147342, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T13:31:37.000Z", "contentLength": 147342, "httpStatusCode": 200}	16d8b283-2300-477c-842a-6d83d1d4d91f	069d6470-5a63-499e-b379-f99a9c40da8c	{}
201d4ead-1f2a-48f2-8853-4e6290f74b04	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776000735554.jpeg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 13:32:16.067839+00	2026-04-12 13:32:16.067839+00	2026-04-12 13:32:16.067839+00	{"eTag": "\\"8f1072b37550d433aa8de5336f33c06b\\"", "size": 158014, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T13:32:16.000Z", "contentLength": 158014, "httpStatusCode": 200}	c141392f-2c85-435b-b111-7652a29a1f6f	069d6470-5a63-499e-b379-f99a9c40da8c	{}
a880b47e-49f1-4675-a68a-202977adb279	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776014571902.jpg	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-12 17:22:52.411728+00	2026-04-12 17:22:52.411728+00	2026-04-12 17:22:52.411728+00	{"eTag": "\\"21f504c721450df15f0448be8fd23209\\"", "size": 378400, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T17:22:53.000Z", "contentLength": 378400, "httpStatusCode": 200}	e591256f-d32d-4859-b169-efbb1fb1f59f	069d6470-5a63-499e-b379-f99a9c40da8c	{}
59d86eb1-701f-459a-a4ac-11273fe856aa	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776074269434.blob	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-13 09:57:49.925898+00	2026-04-13 09:57:49.925898+00	2026-04-13 09:57:49.925898+00	{"eTag": "\\"49dd7373cb7191ada62c949ac4a6f008\\"", "size": 29314, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T09:57:50.000Z", "contentLength": 29314, "httpStatusCode": 200}	e9886c2b-e67d-4eb1-9dd5-57b029f8587b	069d6470-5a63-499e-b379-f99a9c40da8c	{}
79077e12-6eaa-4ff0-934b-ea024790449d	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776074288301.blob	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-13 09:58:08.506342+00	2026-04-13 09:58:08.506342+00	2026-04-13 09:58:08.506342+00	{"eTag": "\\"63e13b6ed930cc94e62083a92dfb359b\\"", "size": 29570, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T09:58:09.000Z", "contentLength": 29570, "httpStatusCode": 200}	31b1b9c9-c88e-43aa-83fb-950e4caed7a7	069d6470-5a63-499e-b379-f99a9c40da8c	{}
bd2e2b3a-cbd6-44c6-81fa-fd9bedc7e4b5	recettes-images	069d6470-5a63-499e-b379-f99a9c40da8c/1776074306885.blob	069d6470-5a63-499e-b379-f99a9c40da8c	2026-04-13 09:58:27.092085+00	2026-04-13 09:58:27.092085+00	2026-04-13 09:58:27.092085+00	{"eTag": "\\"85f0953f1999262b29549ac146d8c7b6\\"", "size": 48560, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T09:58:28.000Z", "contentLength": 48560, "httpStatusCode": 200}	0d88074e-3da9-41b2-89fb-cc12f45163ac	069d6470-5a63-499e-b379-f99a9c40da8c	{}
bbef9440-169b-40b4-b2b0-aa2f877d25cc	recettes-images	pad-thai-crevettes-companion.webp	\N	2026-04-13 10:36:09.139004+00	2026-04-13 10:36:09.139004+00	2026-04-13 10:36:09.139004+00	{"eTag": "\\"93a56b49b6948f26655af4dba77bd3e6\\"", "size": 89158, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:10.000Z", "contentLength": 89158, "httpStatusCode": 200}	069f680d-37f8-41e7-ada1-5b18778aa984	\N	{}
5729270a-86b1-4138-a5dd-7feef65489d1	recettes-images	creme-brulee-companion.webp	\N	2026-04-13 10:36:09.532802+00	2026-04-13 10:36:09.532802+00	2026-04-13 10:36:09.532802+00	{"eTag": "\\"6aabc4cba2d1c1583f64f27e4e30d05d\\"", "size": 47780, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:10.000Z", "contentLength": 47780, "httpStatusCode": 200}	d6190f30-6024-42cb-ac62-7bd0d1c74b0a	\N	{}
1e39655a-3db0-418a-b81e-408bd7090be6	recettes-images	flan-patissier-companion.webp	\N	2026-04-13 10:36:09.927854+00	2026-04-13 10:36:09.927854+00	2026-04-13 10:36:09.927854+00	{"eTag": "\\"d1291c0baa62aa1af839ba919179f9de\\"", "size": 119274, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:10.000Z", "contentLength": 119274, "httpStatusCode": 200}	d1b6ab8c-80cd-41fa-96f0-599ab24442bc	\N	{}
5b97e7fb-6c1e-4cca-9c24-47ecf4b9b2fd	recettes-images	pate-a-tartiner-companion.webp	\N	2026-04-13 10:36:10.241835+00	2026-04-13 10:36:10.241835+00	2026-04-13 10:36:10.241835+00	{"eTag": "\\"66e312d7ba55df5161f4b84c5b01879a\\"", "size": 43122, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:11.000Z", "contentLength": 43122, "httpStatusCode": 200}	137121bc-3d41-4ef7-8223-805288cf4df7	\N	{}
6a5bbd15-0da0-44b4-abb0-b4f804e0dadc	recettes-images	poele-gnocchis-companion.webp	\N	2026-04-13 10:36:10.635406+00	2026-04-13 10:36:10.635406+00	2026-04-13 10:36:10.635406+00	{"eTag": "\\"980a8d43e05a7f98fd48760b81979b52\\"", "size": 88546, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:11.000Z", "contentLength": 88546, "httpStatusCode": 200}	14764815-e626-4f2c-b0b9-098e185de5e6	\N	{}
8dc45797-ece0-4b1f-80a5-5b2ed5331228	recettes-images	poulet-basquaise-companion.webp	\N	2026-04-13 10:36:10.983327+00	2026-04-13 10:36:10.983327+00	2026-04-13 10:36:10.983327+00	{"eTag": "\\"055061e9cf217d4303febe4b1a1bbb28\\"", "size": 62134, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:11.000Z", "contentLength": 62134, "httpStatusCode": 200}	a9922118-8c21-444e-8460-d861b4c3dd72	\N	{}
77968971-2469-4565-80e6-b6dccd23f5d6	recettes-images	puree-patate-douce-companion.webp	\N	2026-04-13 10:36:11.325104+00	2026-04-13 10:36:11.325104+00	2026-04-13 10:36:11.325104+00	{"eTag": "\\"d50993f4474974e4b23dbbdae1db95cd\\"", "size": 75826, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:12.000Z", "contentLength": 75826, "httpStatusCode": 200}	3b8427e5-ebf0-4535-93dd-761fcc1041f3	\N	{}
b3636444-7e93-4326-9d5b-42b7fabb90e5	recettes-images	sauce-bechamel-companion.webp	\N	2026-04-13 10:36:11.663001+00	2026-04-13 10:36:11.663001+00	2026-04-13 10:36:11.663001+00	{"eTag": "\\"2e8bcbe34fb049064d59ab8c2563dda3\\"", "size": 52506, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:12.000Z", "contentLength": 52506, "httpStatusCode": 200}	c9b0be82-9ff2-4eb2-85f4-67555624d978	\N	{}
79e48d9b-5d95-4236-9377-e06c8942355c	recettes-images	smoothie-bowl-acai-companion.webp	\N	2026-04-13 10:36:12.027011+00	2026-04-13 10:36:12.027011+00	2026-04-13 10:36:12.027011+00	{"eTag": "\\"8b3d0e1182eca535a9b5e4ab578308c4\\"", "size": 92230, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:12.000Z", "contentLength": 92230, "httpStatusCode": 200}	3403069e-47db-44c3-9359-a513caef2900	\N	{}
6e44fe61-2f78-480a-bc63-5a63e758316c	recettes-images	soupe-carotte-gingembre-companion.webp	\N	2026-04-13 10:36:12.359113+00	2026-04-13 10:36:12.359113+00	2026-04-13 10:36:12.359113+00	{"eTag": "\\"0dac946869916521cd583cb4d06341f9\\"", "size": 57730, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:13.000Z", "contentLength": 57730, "httpStatusCode": 200}	307f5cab-0bf0-4e91-a3d6-239f3c013f63	\N	{}
2ad29dbf-48d6-463d-9ab1-bf58272e9335	recettes-images	soupe-potiron-companion.webp	\N	2026-04-13 10:36:12.704019+00	2026-04-13 10:36:12.704019+00	2026-04-13 10:36:12.704019+00	{"eTag": "\\"941beb7d7c0a137eda73e9f4af6cbf43\\"", "size": 69502, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T10:36:13.000Z", "contentLength": 69502, "httpStatusCode": 200}	ce632ce5-23f7-496b-b70c-4ae822076ac3	\N	{}
2ee5b980-eb5a-4e8c-aa1e-69103423dbcf	avatars	218b9f37-92e3-4aa5-9125-f0e64a2e2d42-0.3532436316468406.webp	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	2026-04-14 09:48:23.559862+00	2026-04-14 09:48:23.559862+00	2026-04-14 09:48:23.559862+00	{"eTag": "\\"8a2b134ae90740c898f7b4f3923e211c\\"", "size": 203062, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T09:48:24.000Z", "contentLength": 203062, "httpStatusCode": 200}	17410869-2277-439b-bbbe-130a02c543a1	218b9f37-92e3-4aa5-9125-f0e64a2e2d42	{}
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata, metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 165, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_identifier_key UNIQUE (identifier);


--
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_pkey PRIMARY KEY (id);


--
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (user_id);


--
-- Name: banned_users banned_users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banned_users
    ADD CONSTRAINT banned_users_email_key UNIQUE (email);


--
-- Name: banned_users banned_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banned_users
    ADD CONSTRAINT banned_users_pkey PRIMARY KEY (id);


--
-- Name: comment_votes comment_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_votes
    ADD CONSTRAINT comment_votes_pkey PRIMARY KEY (id);


--
-- Name: comment_votes comment_votes_user_id_comment_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_votes
    ADD CONSTRAINT comment_votes_user_id_comment_id_key UNIQUE (user_id, comment_id);


--
-- Name: favoris favoris_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoris
    ADD CONSTRAINT favoris_pkey PRIMARY KEY (id);


--
-- Name: favoris favoris_user_id_recette_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoris
    ADD CONSTRAINT favoris_user_id_recette_id_key UNIQUE (user_id, recette_id);


--
-- Name: meal_plans meal_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_plans
    ADD CONSTRAINT meal_plans_pkey PRIMARY KEY (id);


--
-- Name: meal_plans meal_plans_user_id_week_start_day_index_slot_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_plans
    ADD CONSTRAINT meal_plans_user_id_week_start_day_index_slot_key UNIQUE (user_id, week_start, day_index, slot);


--
-- Name: newsletter_subscribers newsletter_subscribers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_email_key UNIQUE (email);


--
-- Name: newsletter_subscribers newsletter_subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id);


--
-- Name: planificateur planificateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_pkey PRIMARY KEY (id);


--
-- Name: planificateur planificateur_user_id_semaine_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_user_id_semaine_key UNIQUE (user_id, semaine);


--
-- Name: planning_favorites planning_favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_favorites
    ADD CONSTRAINT planning_favorites_pkey PRIMARY KEY (id);


--
-- Name: planning_favorites planning_favorites_user_id_planning_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_favorites
    ADD CONSTRAINT planning_favorites_user_id_planning_id_key UNIQUE (user_id, planning_id);


--
-- Name: planning_likes planning_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_likes
    ADD CONSTRAINT planning_likes_pkey PRIMARY KEY (id);


--
-- Name: planning_likes planning_likes_user_id_planning_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_likes
    ADD CONSTRAINT planning_likes_user_id_planning_id_key UNIQUE (user_id, planning_id);


--
-- Name: profils profils_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profils
    ADD CONSTRAINT profils_pkey PRIMARY KEY (id);


--
-- Name: profils profils_pseudo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profils
    ADD CONSTRAINT profils_pseudo_key UNIQUE (pseudo);


--
-- Name: recettes recettes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recettes
    ADD CONSTRAINT recettes_pkey PRIMARY KEY (id);


--
-- Name: recettes recettes_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recettes
    ADD CONSTRAINT recettes_slug_key UNIQUE (slug);


--
-- Name: recipe_comments recipe_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments
    ADD CONSTRAINT recipe_comments_pkey PRIMARY KEY (id);


--
-- Name: recipe_ratings recipe_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ratings
    ADD CONSTRAINT recipe_ratings_pkey PRIMARY KEY (id);


--
-- Name: recipe_ratings recipe_ratings_user_id_recette_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ratings
    ADD CONSTRAINT recipe_ratings_user_id_recette_id_key UNIQUE (user_id, recette_id);


--
-- Name: submission_log submission_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submission_log
    ADD CONSTRAINT submission_log_pkey PRIMARY KEY (id);


--
-- Name: suppression_feedbacks suppression_feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppression_feedbacks
    ADD CONSTRAINT suppression_feedbacks_pkey PRIMARY KEY (id);


--
-- Name: user_achievements user_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_pkey PRIMARY KEY (id);


--
-- Name: user_achievements user_achievements_user_id_achievement_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_achievement_code_key UNIQUE (user_id, achievement_code);


--
-- Name: user_plannings user_plannings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_plannings
    ADD CONSTRAINT user_plannings_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_created_at_idx ON auth.custom_oauth_providers USING btree (created_at);


--
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_enabled_idx ON auth.custom_oauth_providers USING btree (enabled);


--
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_identifier_idx ON auth.custom_oauth_providers USING btree (identifier);


--
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_provider_type_idx ON auth.custom_oauth_providers USING btree (provider_type);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_expires_at_idx ON auth.webauthn_challenges USING btree (expires_at);


--
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_user_id_idx ON auth.webauthn_challenges USING btree (user_id);


--
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX webauthn_credentials_credential_id_key ON auth.webauthn_credentials USING btree (credential_id);


--
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_credentials_user_id_idx ON auth.webauthn_credentials USING btree (user_id);


--
-- Name: idx_banned_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_banned_users_email ON public.banned_users USING btree (email);


--
-- Name: idx_comment_votes_comment; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_comment_votes_comment ON public.comment_votes USING btree (comment_id);


--
-- Name: idx_comment_votes_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_comment_votes_user ON public.comment_votes USING btree (user_id);


--
-- Name: idx_favoris_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_favoris_user ON public.favoris USING btree (user_id);


--
-- Name: idx_meal_plans_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_meal_plans_user ON public.meal_plans USING btree (user_id);


--
-- Name: idx_meal_plans_week; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_meal_plans_week ON public.meal_plans USING btree (user_id, week_start);


--
-- Name: idx_newsletter_confirmed; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_newsletter_confirmed ON public.newsletter_subscribers USING btree (confirmed);


--
-- Name: idx_newsletter_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers USING btree (email);


--
-- Name: idx_planificateur_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_planificateur_user ON public.planificateur USING btree (user_id);


--
-- Name: idx_planning_likes_planning; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_planning_likes_planning ON public.planning_likes USING btree (planning_id);


--
-- Name: idx_recettes_approuve; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_approuve ON public.recettes USING btree (approuve);


--
-- Name: idx_recettes_auteur_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_auteur_id ON public.recettes USING btree (auteur_id);


--
-- Name: idx_recettes_categories; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_categories ON public.recettes USING gin (categories);


--
-- Name: idx_recettes_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_created_at ON public.recettes USING btree (created_at DESC);


--
-- Name: idx_recettes_note_moyenne; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_note_moyenne ON public.recettes USING btree (note_moyenne DESC);


--
-- Name: idx_recettes_publie; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_publie ON public.recettes USING btree (publie);


--
-- Name: idx_recettes_regime; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_regime ON public.recettes USING gin (regime);


--
-- Name: idx_recettes_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_slug ON public.recettes USING btree (slug);


--
-- Name: idx_recettes_tags; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_tags ON public.recettes USING gin (tags);


--
-- Name: idx_recettes_vues; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recettes_vues ON public.recettes USING btree (vues DESC);


--
-- Name: idx_recipe_comments_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recipe_comments_user_id ON public.recipe_comments USING btree (user_id);


--
-- Name: idx_recipe_ratings_recette; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recipe_ratings_recette ON public.recipe_ratings USING btree (recette_id);


--
-- Name: idx_recipe_ratings_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recipe_ratings_user ON public.recipe_ratings USING btree (user_id);


--
-- Name: idx_submission_log_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_submission_log_user ON public.submission_log USING btree (user_id);


--
-- Name: idx_user_achievements_unnotified; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_achievements_unnotified ON public.user_achievements USING btree (user_id, notified) WHERE (notified = false);


--
-- Name: idx_user_achievements_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_achievements_user_id ON public.user_achievements USING btree (user_id);


--
-- Name: idx_user_plannings_public; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_plannings_public ON public.user_plannings USING btree (is_public) WHERE (is_public = true);


--
-- Name: idx_user_plannings_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_plannings_user_id ON public.user_plannings USING btree (user_id);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_key ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: users trigger_create_profile; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER trigger_create_profile AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_profile_on_signup();


--
-- Name: planning_likes trigger_planning_likes_count; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_planning_likes_count AFTER INSERT OR DELETE ON public.planning_likes FOR EACH ROW EXECUTE FUNCTION public.update_planning_likes_count();


--
-- Name: recipe_ratings trigger_recalc_rating; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_recalc_rating AFTER INSERT OR DELETE OR UPDATE ON public.recipe_ratings FOR EACH ROW EXECUTE FUNCTION public.recalculate_recipe_rating();


--
-- Name: planificateur trigger_update_updated_at_planificateur; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_updated_at_planificateur BEFORE UPDATE ON public.planificateur FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: profils trigger_update_updated_at_profils; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_updated_at_profils BEFORE UPDATE ON public.profils FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: recipe_ratings trigger_update_updated_at_ratings; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_updated_at_ratings BEFORE UPDATE ON public.recipe_ratings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: recettes trigger_update_updated_at_recettes; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_updated_at_recettes BEFORE UPDATE ON public.recettes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: admins admins_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: banned_users banned_users_banned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banned_users
    ADD CONSTRAINT banned_users_banned_by_fkey FOREIGN KEY (banned_by) REFERENCES auth.users(id);


--
-- Name: comment_votes comment_votes_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_votes
    ADD CONSTRAINT comment_votes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.recipe_comments(id) ON DELETE CASCADE;


--
-- Name: comment_votes comment_votes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_votes
    ADD CONSTRAINT comment_votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: favoris favoris_recette_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoris
    ADD CONSTRAINT favoris_recette_id_fkey FOREIGN KEY (recette_id) REFERENCES public.recettes(id) ON DELETE CASCADE;


--
-- Name: favoris favoris_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoris
    ADD CONSTRAINT favoris_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profils(id) ON DELETE CASCADE;


--
-- Name: meal_plans meal_plans_recette_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_plans
    ADD CONSTRAINT meal_plans_recette_id_fkey FOREIGN KEY (recette_id) REFERENCES public.recettes(id) ON DELETE CASCADE;


--
-- Name: meal_plans meal_plans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal_plans
    ADD CONSTRAINT meal_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: planificateur planificateur_dimanche_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_dimanche_fkey FOREIGN KEY (dimanche) REFERENCES public.recettes(id) ON DELETE SET NULL;


--
-- Name: planificateur planificateur_jeudi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_jeudi_fkey FOREIGN KEY (jeudi) REFERENCES public.recettes(id) ON DELETE SET NULL;


--
-- Name: planificateur planificateur_lundi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_lundi_fkey FOREIGN KEY (lundi) REFERENCES public.recettes(id) ON DELETE SET NULL;


--
-- Name: planificateur planificateur_mardi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_mardi_fkey FOREIGN KEY (mardi) REFERENCES public.recettes(id) ON DELETE SET NULL;


--
-- Name: planificateur planificateur_mercredi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_mercredi_fkey FOREIGN KEY (mercredi) REFERENCES public.recettes(id) ON DELETE SET NULL;


--
-- Name: planificateur planificateur_samedi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_samedi_fkey FOREIGN KEY (samedi) REFERENCES public.recettes(id) ON DELETE SET NULL;


--
-- Name: planificateur planificateur_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profils(id) ON DELETE CASCADE;


--
-- Name: planificateur planificateur_vendredi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificateur
    ADD CONSTRAINT planificateur_vendredi_fkey FOREIGN KEY (vendredi) REFERENCES public.recettes(id) ON DELETE SET NULL;


--
-- Name: planning_favorites planning_favorites_planning_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_favorites
    ADD CONSTRAINT planning_favorites_planning_id_fkey FOREIGN KEY (planning_id) REFERENCES public.user_plannings(id) ON DELETE CASCADE;


--
-- Name: planning_favorites planning_favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_favorites
    ADD CONSTRAINT planning_favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: planning_likes planning_likes_planning_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_likes
    ADD CONSTRAINT planning_likes_planning_id_fkey FOREIGN KEY (planning_id) REFERENCES public.user_plannings(id) ON DELETE CASCADE;


--
-- Name: planning_likes planning_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_likes
    ADD CONSTRAINT planning_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: profils profils_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profils
    ADD CONSTRAINT profils_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: recettes recettes_auteur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recettes
    ADD CONSTRAINT recettes_auteur_id_fkey FOREIGN KEY (auteur_id) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: recipe_comments recipe_comments_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments
    ADD CONSTRAINT recipe_comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.recipe_comments(id) ON DELETE CASCADE;


--
-- Name: recipe_comments recipe_comments_recette_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments
    ADD CONSTRAINT recipe_comments_recette_id_fkey FOREIGN KEY (recette_id) REFERENCES public.recettes(id) ON DELETE CASCADE;


--
-- Name: recipe_comments recipe_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments
    ADD CONSTRAINT recipe_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: recipe_ratings recipe_ratings_recette_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ratings
    ADD CONSTRAINT recipe_ratings_recette_id_fkey FOREIGN KEY (recette_id) REFERENCES public.recettes(id) ON DELETE CASCADE;


--
-- Name: recipe_ratings recipe_ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ratings
    ADD CONSTRAINT recipe_ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: submission_log submission_log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submission_log
    ADD CONSTRAINT submission_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_achievements user_achievements_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_plannings user_plannings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_plannings
    ADD CONSTRAINT user_plannings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: banned_users Admins can delete banned_users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can delete banned_users" ON public.banned_users FOR DELETE USING ((EXISTS ( SELECT 1
   FROM public.admins
  WHERE (admins.user_id = auth.uid()))));


--
-- Name: recipe_comments Admins can do everything; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can do everything" ON public.recipe_comments USING ((auth.uid() IN ( SELECT admins.user_id
   FROM public.admins)));


--
-- Name: banned_users Admins can insert banned_users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can insert banned_users" ON public.banned_users FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.admins
  WHERE (admins.user_id = auth.uid()))));


--
-- Name: recettes Admins can read all recipes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can read all recipes" ON public.recettes FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admins
  WHERE (admins.user_id = auth.uid()))));


--
-- Name: banned_users Admins can read banned_users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can read banned_users" ON public.banned_users FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admins
  WHERE (admins.user_id = auth.uid()))));


--
-- Name: recipe_comments Anyone can read approved comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read approved comments" ON public.recipe_comments FOR SELECT USING ((approved = true));


--
-- Name: recettes Anyone can read approved recipes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read approved recipes" ON public.recettes FOR SELECT USING (((approuve = true) AND (publie = true)));


--
-- Name: profils Anyone can read profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read profiles" ON public.profils FOR SELECT USING (true);


--
-- Name: recipe_comments Authenticated users can insert comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can insert comments" ON public.recipe_comments FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: suppression_feedbacks Les utilisateurs peuvent insérer leur feedback de suppression; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Les utilisateurs peuvent insérer leur feedback de suppression" ON public.suppression_feedbacks FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: admins Les utilisateurs peuvent voir leur propre statut admin; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Les utilisateurs peuvent voir leur propre statut admin" ON public.admins FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: planning_likes Likes readable by all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Likes readable by all" ON public.planning_likes FOR SELECT USING (true);


--
-- Name: newsletter_subscribers Newsletter: insert public; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Newsletter: insert public" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);


--
-- Name: newsletter_subscribers Newsletter: no public read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Newsletter: no public read" ON public.newsletter_subscribers FOR SELECT USING (false);


--
-- Name: user_plannings Owner can delete plannings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Owner can delete plannings" ON public.user_plannings FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: user_plannings Owner can insert plannings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Owner can insert plannings" ON public.user_plannings FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_plannings Owner can update plannings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Owner can update plannings" ON public.user_plannings FOR UPDATE USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: planificateur Planificateur: own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Planificateur: own" ON public.planificateur USING ((auth.uid() = user_id));


--
-- Name: profils Profil modifiable par le propriétaire; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Profil modifiable par le propriétaire" ON public.profils FOR UPDATE USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: profils Profils visibles par tous; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Profils visibles par tous" ON public.profils FOR SELECT USING (true);


--
-- Name: user_achievements Public can read achievements; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can read achievements" ON public.user_achievements FOR SELECT USING (true);


--
-- Name: user_plannings Public plannings readable by all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public plannings readable by all" ON public.user_plannings FOR SELECT USING (((is_public = true) OR (auth.uid() = user_id)));


--
-- Name: submission_log Submission log: own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Submission log: own" ON public.submission_log USING ((auth.uid() = user_id));


--
-- Name: user_achievements User achievements insert via server; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User achievements insert via server" ON public.user_achievements FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: planning_favorites User can delete own favorite; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User can delete own favorite" ON public.planning_favorites FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: planning_likes User can delete own like; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User can delete own like" ON public.planning_likes FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: planning_favorites User can insert own favorite; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User can insert own favorite" ON public.planning_favorites FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: planning_likes User can insert own like; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User can insert own like" ON public.planning_likes FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_achievements User can read own achievements; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User can read own achievements" ON public.user_achievements FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: planning_favorites User can read own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User can read own favorites" ON public.planning_favorites FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_achievements User can update own achievements; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "User can update own achievements" ON public.user_achievements FOR UPDATE USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: recipe_comments Users can delete their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own comments" ON public.recipe_comments FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: recettes Users can delete their own pending recipes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own pending recipes" ON public.recettes FOR DELETE USING (((auteur_id = auth.uid()) AND (approuve = false)));


--
-- Name: recettes Users can insert their own recipes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own recipes" ON public.recettes FOR INSERT WITH CHECK ((auth.uid() = auteur_id));


--
-- Name: favoris Users can manage their own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own favorites" ON public.favoris USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- Name: meal_plans Users can manage their own meal plans; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own meal plans" ON public.meal_plans USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- Name: recipe_ratings Users can manage their own ratings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own ratings" ON public.recipe_ratings USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- Name: recipe_comments Users can read their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can read their own comments" ON public.recipe_comments FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: recettes Users can read their own recipes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can read their own recipes" ON public.recettes FOR SELECT USING ((auteur_id = auth.uid()));


--
-- Name: recipe_comments Users can update their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own comments" ON public.recipe_comments FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: recettes Users can update their own pending recipes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own pending recipes" ON public.recettes FOR UPDATE USING (((auteur_id = auth.uid()) AND (approuve = false)));


--
-- Name: profils Users can update their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own profile" ON public.profils FOR UPDATE USING ((id = auth.uid())) WITH CHECK ((id = auth.uid()));


--
-- Name: comment_votes Votes: delete own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Votes: delete own" ON public.comment_votes FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: comment_votes Votes: insert own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Votes: insert own" ON public.comment_votes FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: comment_votes Votes: read all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Votes: read all" ON public.comment_votes FOR SELECT USING (true);


--
-- Name: comment_votes Votes: update own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Votes: update own" ON public.comment_votes FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: admins; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

--
-- Name: banned_users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.banned_users ENABLE ROW LEVEL SECURITY;

--
-- Name: comment_votes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.comment_votes ENABLE ROW LEVEL SECURITY;

--
-- Name: favoris; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.favoris ENABLE ROW LEVEL SECURITY;

--
-- Name: meal_plans; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

--
-- Name: newsletter_subscribers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

--
-- Name: planificateur; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.planificateur ENABLE ROW LEVEL SECURITY;

--
-- Name: planning_favorites; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.planning_favorites ENABLE ROW LEVEL SECURITY;

--
-- Name: planning_likes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.planning_likes ENABLE ROW LEVEL SECURITY;

--
-- Name: profils; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profils ENABLE ROW LEVEL SECURITY;

--
-- Name: recettes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.recettes ENABLE ROW LEVEL SECURITY;

--
-- Name: recipe_comments; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.recipe_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: recipe_ratings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.recipe_ratings ENABLE ROW LEVEL SECURITY;

--
-- Name: submission_log; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.submission_log ENABLE ROW LEVEL SECURITY;

--
-- Name: suppression_feedbacks; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.suppression_feedbacks ENABLE ROW LEVEL SECURITY;

--
-- Name: user_achievements; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

--
-- Name: user_plannings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_plannings ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Comment images: read; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Comment images: read" ON storage.objects FOR SELECT USING ((bucket_id = 'comment-images'::text));


--
-- Name: objects Comment images: upload; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Comment images: upload" ON storage.objects FOR INSERT WITH CHECK (((bucket_id = 'comment-images'::text) AND (auth.uid() IS NOT NULL)));


--
-- Name: objects Delete own; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Delete own" ON storage.objects FOR DELETE USING (((bucket_id = 'recettes-images'::text) AND (auth.uid() IS NOT NULL)));


--
-- Name: objects L'utilisateur peut modifier son propre avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "L'utilisateur peut modifier son propre avatar" ON storage.objects FOR UPDATE TO authenticated USING ((bucket_id = 'avatars'::text));


--
-- Name: objects L'utilisateur peut supprimer son propre avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "L'utilisateur peut supprimer son propre avatar" ON storage.objects FOR DELETE TO authenticated USING ((bucket_id = 'avatars'::text));


--
-- Name: objects L'utilisateur peut uploader son propre avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "L'utilisateur peut uploader son propre avatar" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'avatars'::text));


--
-- Name: objects Read; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Read" ON storage.objects FOR SELECT USING ((bucket_id = 'recettes-images'::text));


--
-- Name: objects Tout le monde peut voir les avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Tout le monde peut voir les avatars" ON storage.objects FOR SELECT USING ((bucket_id = 'avatars'::text));


--
-- Name: objects Upload; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Upload" ON storage.objects FOR INSERT WITH CHECK ((bucket_id = 'recettes-images'::text));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION pg_reload_conf(); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_reload_conf() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION create_profile_on_signup(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_profile_on_signup() TO anon;
GRANT ALL ON FUNCTION public.create_profile_on_signup() TO authenticated;
GRANT ALL ON FUNCTION public.create_profile_on_signup() TO service_role;


--
-- Name: FUNCTION delete_user_account(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.delete_user_account() TO anon;
GRANT ALL ON FUNCTION public.delete_user_account() TO authenticated;
GRANT ALL ON FUNCTION public.delete_user_account() TO service_role;


--
-- Name: FUNCTION is_email_banned(check_email text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.is_email_banned(check_email text) TO anon;
GRANT ALL ON FUNCTION public.is_email_banned(check_email text) TO authenticated;
GRANT ALL ON FUNCTION public.is_email_banned(check_email text) TO service_role;


--
-- Name: FUNCTION recalculate_recipe_rating(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.recalculate_recipe_rating() TO anon;
GRANT ALL ON FUNCTION public.recalculate_recipe_rating() TO authenticated;
GRANT ALL ON FUNCTION public.recalculate_recipe_rating() TO service_role;


--
-- Name: FUNCTION rls_auto_enable(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.rls_auto_enable() TO anon;
GRANT ALL ON FUNCTION public.rls_auto_enable() TO authenticated;
GRANT ALL ON FUNCTION public.rls_auto_enable() TO service_role;


--
-- Name: FUNCTION update_planning_likes_count(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_planning_likes_count() TO anon;
GRANT ALL ON FUNCTION public.update_planning_likes_count() TO authenticated;
GRANT ALL ON FUNCTION public.update_planning_likes_count() TO service_role;


--
-- Name: FUNCTION update_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE custom_oauth_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.custom_oauth_providers TO postgres;
GRANT ALL ON TABLE auth.custom_oauth_providers TO dashboard_user;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_client_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_client_states TO postgres;
GRANT ALL ON TABLE auth.oauth_client_states TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE webauthn_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_challenges TO postgres;
GRANT ALL ON TABLE auth.webauthn_challenges TO dashboard_user;


--
-- Name: TABLE webauthn_credentials; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_credentials TO postgres;
GRANT ALL ON TABLE auth.webauthn_credentials TO dashboard_user;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE admins; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.admins TO anon;
GRANT ALL ON TABLE public.admins TO authenticated;
GRANT ALL ON TABLE public.admins TO service_role;


--
-- Name: TABLE banned_users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.banned_users TO anon;
GRANT ALL ON TABLE public.banned_users TO authenticated;
GRANT ALL ON TABLE public.banned_users TO service_role;


--
-- Name: TABLE comment_votes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.comment_votes TO anon;
GRANT ALL ON TABLE public.comment_votes TO authenticated;
GRANT ALL ON TABLE public.comment_votes TO service_role;


--
-- Name: TABLE favoris; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.favoris TO anon;
GRANT ALL ON TABLE public.favoris TO authenticated;
GRANT ALL ON TABLE public.favoris TO service_role;


--
-- Name: TABLE meal_plans; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.meal_plans TO anon;
GRANT ALL ON TABLE public.meal_plans TO authenticated;
GRANT ALL ON TABLE public.meal_plans TO service_role;


--
-- Name: TABLE newsletter_subscribers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.newsletter_subscribers TO anon;
GRANT ALL ON TABLE public.newsletter_subscribers TO authenticated;
GRANT ALL ON TABLE public.newsletter_subscribers TO service_role;


--
-- Name: TABLE planificateur; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.planificateur TO anon;
GRANT ALL ON TABLE public.planificateur TO authenticated;
GRANT ALL ON TABLE public.planificateur TO service_role;


--
-- Name: TABLE planning_favorites; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.planning_favorites TO anon;
GRANT ALL ON TABLE public.planning_favorites TO authenticated;
GRANT ALL ON TABLE public.planning_favorites TO service_role;


--
-- Name: TABLE planning_likes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.planning_likes TO anon;
GRANT ALL ON TABLE public.planning_likes TO authenticated;
GRANT ALL ON TABLE public.planning_likes TO service_role;


--
-- Name: TABLE profils; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profils TO anon;
GRANT ALL ON TABLE public.profils TO authenticated;
GRANT ALL ON TABLE public.profils TO service_role;


--
-- Name: TABLE recettes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.recettes TO anon;
GRANT ALL ON TABLE public.recettes TO authenticated;
GRANT ALL ON TABLE public.recettes TO service_role;


--
-- Name: TABLE recipe_comments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.recipe_comments TO anon;
GRANT ALL ON TABLE public.recipe_comments TO authenticated;
GRANT ALL ON TABLE public.recipe_comments TO service_role;


--
-- Name: TABLE recipe_ratings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.recipe_ratings TO anon;
GRANT ALL ON TABLE public.recipe_ratings TO authenticated;
GRANT ALL ON TABLE public.recipe_ratings TO service_role;


--
-- Name: TABLE submission_log; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.submission_log TO anon;
GRANT ALL ON TABLE public.submission_log TO authenticated;
GRANT ALL ON TABLE public.submission_log TO service_role;


--
-- Name: TABLE suppression_feedbacks; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.suppression_feedbacks TO anon;
GRANT ALL ON TABLE public.suppression_feedbacks TO authenticated;
GRANT ALL ON TABLE public.suppression_feedbacks TO service_role;


--
-- Name: TABLE user_achievements; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_achievements TO anon;
GRANT ALL ON TABLE public.user_achievements TO authenticated;
GRANT ALL ON TABLE public.user_achievements TO service_role;


--
-- Name: TABLE user_plannings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_plannings TO anon;
GRANT ALL ON TABLE public.user_plannings TO authenticated;
GRANT ALL ON TABLE public.user_plannings TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.buckets FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.buckets TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.objects FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.objects TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: ensure_rls; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER ensure_rls ON ddl_command_end
         WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
   EXECUTE FUNCTION public.rls_auto_enable();


ALTER EVENT TRIGGER ensure_rls OWNER TO postgres;

--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

\unrestrict qpBlxFI6KvyGaxzw6JW6PUt3wHwZPng1tCNpfRdyJPIYw8YqYkOurqczdVsa9yO

