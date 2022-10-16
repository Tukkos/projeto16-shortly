--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(25) NOT NULL,
    email character varying(25) NOT NULL,
    "passwordHash" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 5, 'aa553631-dfce-4036-8e1a-128aba1a0f98', '2022-10-11 15:43:30.117594');
INSERT INTO public.sessions VALUES (2, 2, '4999daa0-347b-49f8-a80a-2c838da6139c', '2022-10-12 11:33:12.884467');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 2, 'https://www.google.com/search?q=gotta+go+fast&hl=pt-BR&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj9jpzF8dj6AhXjK7kGHXjcDcAQ_AUoAnoECAIQBA&biw=1536&bih=791&dpr=1.25', 'YVaPXOAOc9Y1v9rp5HakW', 8, '2022-10-11 16:30:08.0181');
INSERT INTO public.urls VALUES (6, 2, 'batata.com', 'K4bWQ3kS-HWF9vhCghsFE', 0, '2022-10-14 09:00:04.998553');
INSERT INTO public.urls VALUES (7, 5, 'batata.com', 'mvkbAzzYC0SeUgnH5u5gS', 0, '2022-10-14 10:53:26.911092');
INSERT INTO public.urls VALUES (2, 2, 'https://www.youtube.com/watch?v=koFxAChDFwU&list=PLSGHgrs2G2NPQCW_hvykaIm3A61ucRiie&index=6', 'I_bC9niKnTBoY_ak_KeNw', 9, '2022-10-12 11:33:29.866369');
INSERT INTO public.urls VALUES (8, 5, 'batata.com', 'RgvrqtQHdXGwYmj549zWa', 4, '2022-10-14 10:53:28.270741');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Josefa', 'josefa@maga.com', '$2b$10$WXTWtKGgU5W80Wx9vMkdBuBolvaLeybKKwerwLG.Qb9AxREMAyiHK', '2022-10-11 10:59:54.953907');
INSERT INTO public.users VALUES (2, 'Jojo Toddynho', 'jojo@jojoToddynho.com', '$2b$10$duPpAHZ9jnwp656RVjiunuPVI3h17dQXd8N4kTb1lDbBMqGwcKb4e', '2022-10-11 11:21:43.04157');
INSERT INTO public.users VALUES (5, 'Catatau', 'catatau@urso.com', '$2b$10$94cfWv.0o7.vxmpipl.Yhe0pOkvRLE08ANc9eYwnEZfghWtpUmrdi', '2022-10-11 15:19:54.671381');
INSERT INTO public.users VALUES (6, 'Bentinho', 'ribeiro@bentinho.com', '$2b$10$lBYl3GNVnlitj/.mobC3Weu5NgMfpYh0H42LC/GO2bLyDV17/8ney', '2022-10-14 10:47:22.307903');
INSERT INTO public.users VALUES (7, 'Bentinha', 'ribeiro@bentinha.com', '$2b$10$KudU/TdO24qoPecjm5HEHObfBchjf7G5UptvGCh9bTLnonOiL.hXW', '2022-10-14 10:47:53.379821');
INSERT INTO public.users VALUES (8, 'Ritinha', 'riinha@driven.com', '$2b$10$VU2CWahI/aSOduKpvLCwcumz2pfiHeHT2jVGYtV3fHREaPiQSmsna', '2022-10-14 10:48:41.103691');
INSERT INTO public.users VALUES (9, 'Lele', 'lele@driven.com', '$2b$10$2VOpLb7J1r6Clx8xSa532ukjT5uY79C5xBuBRu/efx2Elxk3Gp5vy', '2022-10-14 10:48:50.864366');
INSERT INTO public.users VALUES (10, 'Thi Code', 'thico@driven.com', '$2b$10$2dZX8XVyhUEm8.z1mwD0Ku3ZwN3zFNXYKEKe33jCJEQUxZvXHwfKe', '2022-10-14 10:49:02.773967');
INSERT INTO public.users VALUES (11, 'Thiago', 'thiago@driven.com', '$2b$10$800kwjXVn0lUoqHXHYYYQO0qO0Tqz8ZZNjjfHXSL2wUVYhLBk8i6i', '2022-10-14 10:49:14.307328');
INSERT INTO public.users VALUES (12, 'Bruno', 'bruno@driven.com', '$2b$10$l5qija2B6A7LD1HkQTPnUu7L2Rf8o.Jf7n8CeQ3WdZg7T6quqMYuC', '2022-10-14 10:49:43.278253');
INSERT INTO public.users VALUES (13, 'Joao', 'joao@driven.com', '$2b$10$phtbbuDw./YMOIoCYBxO5.wnej5sr4v6R7samfFxeieeNUfEeuZdq', '2022-10-14 10:50:03.997444');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

