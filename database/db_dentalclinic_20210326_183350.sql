--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: customers; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA customers;


ALTER SCHEMA customers OWNER TO postgres;

--
-- Name: security; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA security;


ALTER SCHEMA security OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: clients; Type: TABLE; Schema: customers; Owner: postgres
--

CREATE TABLE customers.clients (
    id_client integer NOT NULL,
    name character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    dni integer NOT NULL,
    phone character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    address character varying(50) NOT NULL
);


ALTER TABLE customers.clients OWNER TO postgres;

--
-- Name: clients_id_client_seq; Type: SEQUENCE; Schema: customers; Owner: postgres
--

CREATE SEQUENCE customers.clients_id_client_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customers.clients_id_client_seq OWNER TO postgres;

--
-- Name: clients_id_client_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: postgres
--

ALTER SEQUENCE customers.clients_id_client_seq OWNED BY customers.clients.id_client;


--
-- Name: especialistas; Type: TABLE; Schema: customers; Owner: postgres
--

CREATE TABLE customers.especialistas (
    id_especialista integer NOT NULL,
    name character varying(50) NOT NULL,
    days integer[] NOT NULL,
    since time with time zone NOT NULL,
    until time with time zone NOT NULL,
    speciality character varying(50) NOT NULL,
    gender character(1) NOT NULL
);


ALTER TABLE customers.especialistas OWNER TO postgres;

--
-- Name: especialistas_id_especialista_seq; Type: SEQUENCE; Schema: customers; Owner: postgres
--

CREATE SEQUENCE customers.especialistas_id_especialista_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customers.especialistas_id_especialista_seq OWNER TO postgres;

--
-- Name: especialistas_id_especialista_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: postgres
--

ALTER SEQUENCE customers.especialistas_id_especialista_seq OWNED BY customers.especialistas.id_especialista;


--
-- Name: messages; Type: TABLE; Schema: customers; Owner: postgres
--

CREATE TABLE customers.messages (
    id_message integer NOT NULL,
    subject character varying(50) NOT NULL,
    message text NOT NULL,
    sent timestamp without time zone NOT NULL,
    read boolean
);


ALTER TABLE customers.messages OWNER TO postgres;

--
-- Name: messages_id_message_seq; Type: SEQUENCE; Schema: customers; Owner: postgres
--

CREATE SEQUENCE customers.messages_id_message_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customers.messages_id_message_seq OWNER TO postgres;

--
-- Name: messages_id_message_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: postgres
--

ALTER SEQUENCE customers.messages_id_message_seq OWNED BY customers.messages.id_message;


--
-- Name: turnos; Type: TABLE; Schema: customers; Owner: postgres
--

CREATE TABLE customers.turnos (
    id_turno integer NOT NULL,
    client_id integer DEFAULT 0 NOT NULL,
    especialista_id integer NOT NULL,
    horario timestamp without time zone NOT NULL
);


ALTER TABLE customers.turnos OWNER TO postgres;

--
-- Name: turnos_id_turno_seq; Type: SEQUENCE; Schema: customers; Owner: postgres
--

CREATE SEQUENCE customers.turnos_id_turno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customers.turnos_id_turno_seq OWNER TO postgres;

--
-- Name: turnos_id_turno_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: postgres
--

ALTER SEQUENCE customers.turnos_id_turno_seq OWNED BY customers.turnos.id_turno;


--
-- Name: roles; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.roles (
    id_role integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE security.roles OWNER TO postgres;

--
-- Name: roles_id_role_seq; Type: SEQUENCE; Schema: security; Owner: postgres
--

CREATE SEQUENCE security.roles_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE security.roles_id_role_seq OWNER TO postgres;

--
-- Name: roles_id_role_seq; Type: SEQUENCE OWNED BY; Schema: security; Owner: postgres
--

ALTER SEQUENCE security.roles_id_role_seq OWNED BY security.roles.id_role;


--
-- Name: users; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.users (
    id_user integer NOT NULL,
    name character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE security.users OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: security; Owner: postgres
--

CREATE SEQUENCE security.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE security.users_id_user_seq OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: security; Owner: postgres
--

ALTER SEQUENCE security.users_id_user_seq OWNED BY security.users.id_user;


--
-- Name: clients id_client; Type: DEFAULT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.clients ALTER COLUMN id_client SET DEFAULT nextval('customers.clients_id_client_seq'::regclass);


--
-- Name: especialistas id_especialista; Type: DEFAULT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.especialistas ALTER COLUMN id_especialista SET DEFAULT nextval('customers.especialistas_id_especialista_seq'::regclass);


--
-- Name: messages id_message; Type: DEFAULT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.messages ALTER COLUMN id_message SET DEFAULT nextval('customers.messages_id_message_seq'::regclass);


--
-- Name: turnos id_turno; Type: DEFAULT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.turnos ALTER COLUMN id_turno SET DEFAULT nextval('customers.turnos_id_turno_seq'::regclass);


--
-- Name: roles id_role; Type: DEFAULT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.roles ALTER COLUMN id_role SET DEFAULT nextval('security.roles_id_role_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users ALTER COLUMN id_user SET DEFAULT nextval('security.users_id_user_seq'::regclass);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: customers; Owner: postgres
--

INSERT INTO customers.clients VALUES (1, 'camilo', 'sanchez', 123456, '123456', 'camilo@gmail.com', 'asdf');


--
-- Data for Name: especialistas; Type: TABLE DATA; Schema: customers; Owner: postgres
--

INSERT INTO customers.especialistas VALUES (1, 'Dra. Mendez Paula', '{0,1,2,3,4}', '10:00:00+00', '16:00:00+00', 'ortodoncia', 'f');
INSERT INTO customers.especialistas VALUES (2, 'Dr. López Roberto', '{1,2,3}', '09:00:00+00', '12:00:00+00', 'implantes', 'm');
INSERT INTO customers.especialistas VALUES (3, 'Dra. Pérez María', '{0,4}', '14:00:00+00', '19:00:00+00', 'estética dental', 'f');


--
-- Data for Name: messages; Type: TABLE DATA; Schema: customers; Owner: postgres
--



--
-- Data for Name: turnos; Type: TABLE DATA; Schema: customers; Owner: postgres
--

INSERT INTO customers.turnos VALUES (2, 0, 2, '2021-03-30 09:00:00');
INSERT INTO customers.turnos VALUES (3, 0, 3, '2021-03-29 14:00:00');
INSERT INTO customers.turnos VALUES (5, 0, 1, '2021-03-30 11:00:00');
INSERT INTO customers.turnos VALUES (6, 0, 2, '2021-03-31 10:00:00');
INSERT INTO customers.turnos VALUES (7, 0, 3, '2021-03-29 15:00:00');
INSERT INTO customers.turnos VALUES (10, 0, 1, '2021-03-29 13:00:00');
INSERT INTO customers.turnos VALUES (11, 0, 1, '2021-03-30 14:00:00');
INSERT INTO customers.turnos VALUES (12, 0, 1, '2021-03-31 15:00:00');
INSERT INTO customers.turnos VALUES (13, 0, 2, '2021-03-30 11:00:00');
INSERT INTO customers.turnos VALUES (14, 0, 3, '2021-03-29 16:00:00');
INSERT INTO customers.turnos VALUES (15, 0, 3, '2021-03-29 17:00:00');
INSERT INTO customers.turnos VALUES (16, 0, 3, '2021-03-29 18:00:00');
INSERT INTO customers.turnos VALUES (1, 0, 1, '2021-03-29 10:00:00');
INSERT INTO customers.turnos VALUES (9, 0, 1, '2021-03-31 12:00:00');


--
-- Data for Name: roles; Type: TABLE DATA; Schema: security; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: security; Owner: postgres
--



--
-- Name: clients_id_client_seq; Type: SEQUENCE SET; Schema: customers; Owner: postgres
--

SELECT pg_catalog.setval('customers.clients_id_client_seq', 1, true);


--
-- Name: especialistas_id_especialista_seq; Type: SEQUENCE SET; Schema: customers; Owner: postgres
--

SELECT pg_catalog.setval('customers.especialistas_id_especialista_seq', 3, true);


--
-- Name: messages_id_message_seq; Type: SEQUENCE SET; Schema: customers; Owner: postgres
--

SELECT pg_catalog.setval('customers.messages_id_message_seq', 1, false);


--
-- Name: turnos_id_turno_seq; Type: SEQUENCE SET; Schema: customers; Owner: postgres
--

SELECT pg_catalog.setval('customers.turnos_id_turno_seq', 16, true);


--
-- Name: roles_id_role_seq; Type: SEQUENCE SET; Schema: security; Owner: postgres
--

SELECT pg_catalog.setval('security.roles_id_role_seq', 1, false);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: security; Owner: postgres
--

SELECT pg_catalog.setval('security.users_id_user_seq', 1, false);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id_client);


--
-- Name: especialistas especialistas_pkey; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.especialistas
    ADD CONSTRAINT especialistas_pkey PRIMARY KEY (id_especialista);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id_message);


--
-- Name: turnos turnos_pkey; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.turnos
    ADD CONSTRAINT turnos_pkey PRIMARY KEY (id_turno);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_role);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: turnos turnos_especialista_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.turnos
    ADD CONSTRAINT turnos_especialista_id_fkey FOREIGN KEY (especialista_id) REFERENCES customers.especialistas(id_especialista);


--
-- Name: users users_role; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT users_role FOREIGN KEY (role_id) REFERENCES security.roles(id_role) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

