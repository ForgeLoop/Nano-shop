import React from 'react';
import { Input, Button } from 'antd';
import { mobileSearchDropdownStyles } from './navbar.styles';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { COLORS } from './navbar.constants';

interface MobileSearchDropdownProps {
    visible: boolean;
    onClose: () => void;
    searchButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const MobileSearchDropdown: React.FC<MobileSearchDropdownProps> = ({ visible, onClose, searchButtonRef }) => {
    const [searchValue, setSearchValue] = React.useState('');
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Effect to handle click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (visible && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // También verificar si el click fue en el botón de búsqueda
                if (searchButtonRef?.current && searchButtonRef.current.contains(event.target as Node)) {
                    return; // No cerrar si el click fue en el botón de búsqueda
                }
                onClose();
            }
        };

        // Add event listener when visible
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, onClose]);

    if (!visible) return null;

    const handleSearch = () => {
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            // Aquí puedes agregar la lógica de búsqueda
            onClose();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div
            ref={dropdownRef}
            style={mobileSearchDropdownStyles.container}>
            {/* Input de búsqueda */}
            <Input
                placeholder="¿Qué estás buscando?"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
                style={mobileSearchDropdownStyles.input}
                styles={{
                    input: mobileSearchDropdownStyles.inputAnt
                }}
                suffix={
                    <Button
                        type="text"
                        icon={<SearchOutlined />}
                        onClick={handleSearch}
                         style={mobileSearchDropdownStyles.searchButton}
                    />
                }
            />

            {/* Botón cerrar */}
            <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onClose}
                style={mobileSearchDropdownStyles.closeButton}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            />
        </div>
    );
};
