import Head from "next/head";

export default function MetaData({ title }) {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
}
