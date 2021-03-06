import React from 'react';
import styled from 'styled-components';

const NsfwWarningHeader = styled.h4`
  color: red;
`;

const NsfwWarning = styled.p`
  font-style: italic;
  font-weight: bold;
  color: red;
`;

export default function Title() {
  return (
    <div>
      <NsfwWarningHeader>NSFW</NsfwWarningHeader>
      <NsfwWarning>
        Unblur previews by checking "Show NSFW" in Settings
      </NsfwWarning>
    </div>
  );
}
