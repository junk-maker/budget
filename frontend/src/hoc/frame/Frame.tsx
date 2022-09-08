import React from 'react';

interface FrameProps {
    children: React.ReactNode;
};

const Frame = ({children}: FrameProps) => <div className={'frame'}>{children}</div>;

export default Frame;