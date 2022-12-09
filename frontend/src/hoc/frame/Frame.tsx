import FrameInterface from './frame.interface';

const Frame = ({children, className}: FrameInterface): JSX.Element => <div className={className}>{children}</div>;

export default Frame;