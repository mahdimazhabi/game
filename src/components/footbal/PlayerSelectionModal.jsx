
const PlayerSelectionModal = ({isModalOpen, availablePlayers, handleChangeSelection}) => {
    return (
        <div className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div className="modal-content">
                <h2>Select Player</h2>
                {Object.entries(availablePlayers).map(([role, players]) => (
                    <div key={role}>
                        <h3 style={{ textTransform: 'capitalize' }}>{role}</h3>
                        <div className="role-group">
                            {players.map((player) => (
                                <button
                                    key={player.name}
                                    style={{ backgroundColor: player.color }}
                                    onClick={() => handleChangeSelection(player.name)}
                                    className="player-option"
                                >
                                    {player.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerSelectionModal;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function App() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

        </div>
    );
}