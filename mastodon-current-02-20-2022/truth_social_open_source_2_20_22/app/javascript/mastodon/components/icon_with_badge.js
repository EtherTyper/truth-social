import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'mastodon/components/icon';
import IconSvg from 'mastodon/components/icon_svg';

const formatNumber = num => num > 40 ? '40+' : num;

const IconWithBadge = ({ id, count, issueBadge, className, svg }) => (
  <i className='icon-with-badge'>
    {svg 
          ? <IconSvg svg={svg} /> 
          :  <Icon id={id} fixedWidth className={className} />
        }     

    {count > 0 && <i className='icon-with-badge__badge'>{formatNumber(count)}</i>}
    {issueBadge && <i className='icon-with-badge__issue-badge' />}
  </i>
);

IconWithBadge.propTypes = {
  id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  issueBadge: PropTypes.bool,
  className: PropTypes.string,
};

export default IconWithBadge;
