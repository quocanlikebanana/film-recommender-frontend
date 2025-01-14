import React from 'react';
import { ContentProvider } from '../context/Content.provider';
import ContentContent from '../context/Content.content';

const ContentLayout: React.FC = () => {
	return (
		<ContentProvider>
			<ContentContent />
		</ContentProvider>
	);
};

export default ContentLayout;
