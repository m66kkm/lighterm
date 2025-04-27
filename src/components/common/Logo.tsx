import React from 'react';
import '../../styles/settings.css';

interface LogoProps {
  title: string;
  version: string;
  imageSrc?: string;
}

/**
 * Logo组件
 * 用于显示应用的标志、标题和版本
 */
const Logo: React.FC<LogoProps> = ({ title, version, imageSrc }) => {
  return (
    <div className="logo-container">
      {imageSrc && (
        <div className="logo-image">
          <img src={imageSrc} alt={`${title} Logo`} />
        </div>
      )}
      <div className="logo-text">
        <h2>{title}<sup>α</sup></h2>
        <p>{version}</p>
      </div>
    </div>
  );
};

export default Logo;
