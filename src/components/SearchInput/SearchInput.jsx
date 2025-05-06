import './SearchInput.css';
import { Search } from 'react-bootstrap-icons';

export default function SearchInput({ placeholder = "Pesquisar", value, onChange }) {
  return (
    <div className="search-input">
      <Search className="search-icon"/>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
