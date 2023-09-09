import useSWR from 'swr';

const fetcher = async (input) => {
    const res = await fetch(input);
    return await res.json();
};

const ViewCounter = ({ slug }) => {
    const { data } = useSWR(`/api/views/${slug}`, fetcher);
    return `${data?.total || 0} views`;
};

export default ViewCounter;