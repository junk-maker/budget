interface BounceLoaderProps {
    className: string;
};

const BounceLoader = ({className}: BounceLoaderProps) => {
    return (
        <div className={`bounce ${className}`}>
            <ul className={'bounce__container'}>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
            </ul>
        </div>
    );
};

export default BounceLoader;