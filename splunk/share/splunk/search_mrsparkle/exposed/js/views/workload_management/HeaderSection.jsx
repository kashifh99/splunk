import { createTestHook } from 'util/test_support';
import React from 'react';
import PropTypes from 'prop-types';
import Heading from '@splunk/react-ui/Heading';
import css from './WorkloadManagement.pcssm';

const HeaderSection = (props) => {
    const { title, description, learnMore, children } = props;
    const sectionClassName = `section-header section-padded ${css.paddingTopNone}`;

    return (
        <div {...createTestHook(module.id)}>
            <div className={sectionClassName}>
                {children}
                <Heading level={1}>{title}</Heading>
                <p>{description} {learnMore}</p>
            </div>
        </div>
    );
};

HeaderSection.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    learnMore: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node,
};

HeaderSection.defaultProps = {
    title: '',
    description: '',
    children: undefined,
};

export default HeaderSection;