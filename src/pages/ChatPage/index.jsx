import React, { useEffect, useState } from 'react';
import LeftSide from './components/LeftSide/index';
import RightSide from './components/RightSide/index';
import Wrapper from '../../components/Wrapper/index';
import { chatApi } from '../../api/chatApi';

function ChatPage() {
    const [selectedContact, setSelectedContact] = useState(null);
    const handleContactSelect = (contact) => {
        setSelectedContact(contact)
    }
    
    return (
        <Wrapper>
            <LeftSide contactCB={handleContactSelect} />
            <RightSide phoneNumber={selectedContact } />
        </Wrapper>
  );
}

export default ChatPage;