// App state
let parties = JSON.parse(localStorage.getItem('parties')) || [];
let currentCombat = JSON.parse(localStorage.getItem('currentCombat')) || null;
let deferredPrompt;

// DOM elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const installButton = document.getElementById('installButton');
const offlineIndicator = document.getElementById('offlineIndicator');

// Party management elements
const newPartyBtn = document.getElementById('newPartyBtn');
const partyModal = document.getElementById('partyModal');
const closePartyModal = document.getElementById('closePartyModal');
const partyNameInput = document.getElementById('partyNameInput');
const addCharacterBtn = document.getElementById('addCharacterBtn');
const characterInputs = document.getElementById('characterInputs');
const savePartyBtn = document.getElementById('savePartyBtn');
const cancelPartyBtn = document.getElementById('cancelPartyBtn');
const partyList = document.getElementById('partyList');

// Combat elements
const newCombatBtn = document.getElementById('newCombatBtn');
const endCombatBtn = document.getElementById('endCombatBtn');
const partySelect = document.getElementById('partySelect');
const partyCharacters = document.getElementById('partyCharacters');
const partyCharactersList = document.getElementById('partyCharactersList');
const npcNameInput = document.getElementById('npcNameInput');
const npcInitInput = document.getElementById('npcInitInput');
const addNpcBtn = document.getElementById('addNpcBtn');
const npcList = document.getElementById('npcList');
const startCombatBtn = document.getElementById('startCombatBtn');
const combatSetup = document.getElementById('combatSetup');
const combatTracker = document.getElementById('combatTracker');
const currentRound = document.getElementById('currentRound');
const currentTurn = document.getElementById('currentTurn');
const nextTurnBtn = document.getElementById('nextTurnBtn');
const initiativeOrder = document.getElementById('initiativeOrder');

// Custom modal elements
const customAlertModal = document.getElementById('customAlertModal');
const customAlertTitle = document.getElementById('customAlertTitle');
const customAlertMessage = document.getElementById('customAlertMessage');
const customAlertOkBtn = document.getElementById('customAlertOkBtn');

const customConfirmModal = document.getElementById('customConfirmModal');
const customConfirmTitle = document.getElementById('customConfirmTitle');
const customConfirmMessage = document.getElementById('customConfirmMessage');
const customConfirmOkBtn = document.getElementById('customConfirmOkBtn');
const customConfirmCancelBtn = document.getElementById('customConfirmCancelBtn');

// Manual roll elements
const manualRollMode = document.getElementById('manualRollMode');
const manualRollModal = document.getElementById('manualRollModal');
const manualRollInputs = document.getElementById('manualRollInputs');
const cancelManualRolls = document.getElementById('cancelManualRolls');
const confirmManualRolls = document.getElementById('confirmManualRolls');

let editingPartyId = null;
let combatParticipants = [];

// Build timestamp function
function initializeBuildTimestamp() {
    const buildDateElement = document.getElementById('buildDate');
    if (buildDateElement) {
        // This timestamp will be updated manually when you make changes
        // Format: YYYY-MM-DD HH:MM UTC
        const buildTimestamp = '2025-07-30 17:09 UTC';
        buildDateElement.textContent = `Last updated: ${buildTimestamp}`;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    
    // Initialize build timestamp
    initializeBuildTimestamp();
    
    // Debug: Check if elements exist
    console.log('newPartyBtn:', newPartyBtn);
    console.log('newCombatBtn:', newCombatBtn);
    console.log('partyModal:', partyModal);
    
    setupEventListeners();
    setupBurgerMenu();
    setupThemeToggle();
    setupSettings();
    setupScrollIndicators();
    renderParties();
    populatePartySelect();
    checkOnlineStatus();
    updateStartButtonText();
    
    // Ensure parties tab is always the default on load
    switchTab('parties');
    
    // Restore combat state if exists
    if (currentCombat) {
        showCombatTab();
        showCombatTracker();
        renderInitiativeOrder();
        // Enable fullscreen combat mode for restored combat
        document.body.classList.add('fullscreen-combat');
    }
});

// Event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Tab navigation
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });

    // Party management
    if (newPartyBtn) {
        newPartyBtn.addEventListener('click', openPartyModal);
        console.log('New Party button listener added');
    } else {
        console.error('newPartyBtn not found!');
    }
    
    if (closePartyModal) {
        closePartyModal.addEventListener('click', closeModal);
    }
    
    if (cancelPartyBtn) {
        cancelPartyBtn.addEventListener('click', closeModal);
    }
    
    if (savePartyBtn) {
        savePartyBtn.addEventListener('click', saveParty);
    }
    
    if (addCharacterBtn) {
        addCharacterBtn.addEventListener('click', (e) => {
            console.log('Add Character button clicked');
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            addCharacterInput();
        });
    }

    // Combat management
    if (newCombatBtn) {
        newCombatBtn.addEventListener('click', startNewCombat);
        console.log('New Combat button listener added');
    } else {
        console.error('newCombatBtn not found!');
    }
    
    if (endCombatBtn) {
        endCombatBtn.addEventListener('click', endCombat);
    }
    
    if (addNpcBtn) {
        addNpcBtn.addEventListener('click', addNPC);
    }
    
    if (startCombatBtn) {
        startCombatBtn.addEventListener('click', startCombat);
    }
    
    // Manual roll functionality
    if (manualRollMode) {
        manualRollMode.addEventListener('change', updateStartButtonText);
    }
    
    if (cancelManualRolls) {
        cancelManualRolls.addEventListener('click', () => {
            manualRollModal.style.display = 'none';
        });
    }
    
    if (confirmManualRolls) {
        confirmManualRolls.addEventListener('click', startCombatWithManualRolls);
    }
    
    if (nextTurnBtn) {
        nextTurnBtn.addEventListener('click', nextTurn);
    }

    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'block';
    });

    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
            installButton.style.display = 'none';
        }
    });

    // Online/offline status
    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    // Close modal when clicking outside
    partyModal.addEventListener('click', (e) => {
        if (e.target === partyModal) closeModal();
    });
    
    // Alternative event delegation approach
    document.addEventListener('click', (e) => {
        if (e.target.id === 'newPartyBtn') {
            console.log('New Party clicked via delegation');
            e.preventDefault();
            openPartyModal();
        }
        if (e.target.id === 'newCombatBtn') {
            console.log('New Combat clicked via delegation');
            e.preventDefault();
            startNewCombat();
        }
        // Removed addCharacterBtn delegation to prevent duplicate calls
    });
}

// Tab management
function switchTab(tabName) {
    // Update tab buttons (both regular tabs and dropdown items)
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Find the correct button to mark as active
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // If it's a dropdown item (about or settings), don't mark any main tab as active
    if (tabName === 'about' || tabName === 'settings') {
        // Clear main tab active states
        document.querySelectorAll('.tab-navigation > .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    // Update tab content
    tabContents.forEach(content => content.classList.remove('active'));
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

function showCombatTab() {
    switchTab('combat');
}

// Party management functions
function openPartyModal(partyId = null) {
    console.log('openPartyModal called with partyId:', partyId);
    editingPartyId = partyId;
    
    if (!partyModal) {
        console.error('partyModal element not found!');
        return;
    }
    
    if (partyId) {
        const party = parties.find(p => p.id === partyId);
        if (party) {
            console.log('Editing party:', party);
            console.log('Party characters:', party.characters);
            
            document.getElementById('partyModalTitle').textContent = 'Edit Party';
            partyNameInput.value = party.name;
            
            // Clear and populate characters
            characterInputs.innerHTML = '';
            
            // Add a small delay to ensure DOM is updated
            setTimeout(() => {
                party.characters.forEach((char, index) => {
                    console.log(`Adding character ${index}:`, char.name, char.initModifier);
                    addCharacterInput(char.name, char.initModifier);
                });
            }, 10);
        } else {
            console.error('Party not found for ID:', partyId);
        }
    } else {
        document.getElementById('partyModalTitle').textContent = 'Create New Party';
        if (partyNameInput) partyNameInput.value = '';
        if (characterInputs) {
            characterInputs.innerHTML = '';
            addCharacterInput(); // Add one empty character input
        }
    }
    
    partyModal.style.display = 'flex';
    if (partyNameInput) partyNameInput.focus();
}

function closeModal() {
    partyModal.style.display = 'none';
    editingPartyId = null;
}

let addingCharacter = false; // Prevent rapid duplicate calls

function addCharacterInput(name = '', initMod = 0) {
    // Only use debouncing for user-initiated clicks (when name is empty)
    // Skip debouncing when programmatically loading characters during edit
    if (name === '' && addingCharacter) {
        console.log('Already adding character, ignoring duplicate call');
        return;
    }
    
    if (name === '') {
        addingCharacter = true;
        setTimeout(() => { addingCharacter = false; }, 100); // Reset after 100ms
    }
    
    console.log('Adding character input:', name, initMod);
    
    // Handle case where this might be called with an event object
    if (typeof name === 'object' && name !== null) {
        name = '';
        initMod = 0;
    }
    
    // Ensure we have valid defaults
    if (typeof name !== 'string') name = '';
    if (typeof initMod !== 'number') initMod = 0;
    
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character-input';
    characterDiv.innerHTML = `
        <input type="text" placeholder="Character name" class="char-name" value="${name}">
        <input type="number" placeholder="Init mod" class="char-init" value="${initMod}">
        <button class="remove-char-btn" onclick="removeCharacterInput(this)">🗑️</button>
    `;
    
    if (characterInputs) {
        characterInputs.appendChild(characterDiv);
    }
}

function removeCharacterInput(button) {
    button.parentElement.remove();
}

function saveParty() {
    const name = partyNameInput.value.trim();
    if (!name) {
        showCustomAlert('Please enter a party name');
        return;
    }

    const characterElements = characterInputs.querySelectorAll('.character-input');
    console.log('Found character elements:', characterElements.length);
    
    const characters = [];
    
    characterElements.forEach((charEl, index) => {
        const charName = charEl.querySelector('.char-name').value.trim();
        const initMod = parseInt(charEl.querySelector('.char-init').value) || 0;
        
        console.log(`Character ${index}: "${charName}", initMod: ${initMod}`);
        
        if (charName) {
            characters.push({
                id: Date.now().toString() + Math.random(),
                name: charName,
                initModifier: initMod
            });
        }
    });

    console.log('Final characters array:', characters);

    if (characters.length === 0) {
        showCustomAlert('Please add at least one character');
        return;
    }

    const party = {
        id: editingPartyId || Date.now().toString(),
        name: name,
        characters: characters,
        createdAt: editingPartyId ? parties.find(p => p.id === editingPartyId).createdAt : new Date().toISOString()
    };

    console.log('Saving party:', party);

    if (editingPartyId) {
        const index = parties.findIndex(p => p.id === editingPartyId);
        parties[index] = party;
    } else {
        parties.push(party);
    }

    saveParties();
    renderParties();
    populatePartySelect();
    closeModal();
}

async function deleteParty(partyId) {
    const confirmed = await showCustomConfirm('Are you sure you want to delete this party?', 'Delete Party');
    if (confirmed) {
        parties = parties.filter(p => p.id !== partyId);
        saveParties();
        renderParties();
        populatePartySelect();
    }
}

function saveParties() {
    localStorage.setItem('parties', JSON.stringify(parties));
}

function renderParties() {
    if (parties.length === 0) {
        partyList.innerHTML = `
            <div class="empty-state">
                <p>🎭 No parties created yet!</p>
                <p>Create your first party to get started with combat tracking.</p>
            </div>
        `;
        return;
    }

    partyList.innerHTML = parties.map(party => `
        <div class="party-card">
            <div class="party-header">
                <h3 class="party-name">${escapeHtml(party.name)}</h3>
                <div class="party-actions">
                    <button class="icon-btn" onclick="openPartyModal('${party.id}')" title="Edit party">✏️</button>
                    <button class="icon-btn" onclick="deleteParty('${party.id}')" title="Delete party">🗑️</button>
                </div>
            </div>
            <div class="character-list">
                <h4>Characters (${party.characters.length})</h4>
                ${party.characters.map(char => `
                    <div class="character-item">
                        <span class="character-name">${escapeHtml(char.name)}</span>
                        <span class="character-init">${formatInitiativeModifier(char.initModifier)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function populatePartySelect() {
    partySelect.innerHTML = '<option value="">Select a party...</option>';
    parties.forEach(party => {
        partySelect.innerHTML += `<option value="${party.id}">${escapeHtml(party.name)}</option>`;
    });
}

function displayPartyCharacters(partyId) {
    // Always show the section if there are any participants
    const hasParty = partyId && parties.find(p => p.id === partyId);
    const hasNPCs = combatParticipants.filter(p => p.type === 'npc').length > 0;
    
    if (!hasParty && !hasNPCs) {
        if (partyCharacters) partyCharacters.style.display = 'none';
        return;
    }
    
    // Show the participants section
    if (partyCharacters) partyCharacters.style.display = 'block';
    
    if (partyCharactersList) {
        let html = '';
        
        // Add party characters (PCs)
        if (hasParty) {
            const party = parties.find(p => p.id === partyId);
            if (party && party.characters && party.characters.length > 0) {
                party.characters.forEach(char => {
                    html += `
                        <div class="party-character-item" data-id="${char.id}" data-type="pc">
                            <div class="character-info-section">
                                <span class="character-type-tag pc">PC</span>
                                <span class="party-character-name">${escapeHtml(char.name)}</span>
                            </div>
                            <span class="party-character-init">${formatInitiativeModifier(char.initModifier)}</span>
                        </div>
                    `;
                });
            }
        }
        
        // Add NPCs
        const npcs = combatParticipants.filter(p => p.type === 'npc');
        npcs.forEach(npc => {
            html += `
                <div class="party-character-item" data-id="${npc.id}" data-type="npc">
                    <div class="character-info-section">
                        <span class="character-type-tag npc">NPC</span>
                        <input type="text" class="party-character-name editable" value="${escapeHtml(npc.name)}" 
                               onchange="updateNPCName('${npc.id}', this.value)" 
                               onblur="updateNPCName('${npc.id}', this.value)">
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="number" class="party-character-init editable" value="${npc.initModifier}" 
                               onchange="updateNPCInit('${npc.id}', this.value)"
                               onblur="updateNPCInit('${npc.id}', this.value)"
                               min="-20" max="20">
                        <div class="character-actions">
                            <button class="character-action-btn delete-btn" onclick="removeNPCFromList('${npc.id}')" title="Delete NPC">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        partyCharactersList.innerHTML = html;
    }
}

// Combat management functions
async function startNewCombat() {
    console.log('startNewCombat called');
    
    if (currentCombat) {
        const confirmed = await showCustomConfirm('This will end the current combat. Continue?', 'End Current Combat');
        if (!confirmed) return;
    }
    
    currentCombat = null;
    combatParticipants = [];
    localStorage.removeItem('currentCombat');
    
    if (combatSetup) combatSetup.style.display = 'block';
    if (combatTracker) combatTracker.style.display = 'none';
    if (endCombatBtn) endCombatBtn.style.display = 'none';
    if (startCombatBtn) startCombatBtn.style.display = 'none';
    if (partyCharacters) partyCharacters.style.display = 'none';
    
    // Clear NPC list
    if (npcList) npcList.innerHTML = '';
    if (partySelect) partySelect.value = '';
    if (npcNameInput) npcNameInput.value = '';
    if (npcInitInput) npcInitInput.value = '0';
    
    // Check if we can start combat
    checkCombatReadiness();
}

function addNPC() {
    const name = npcNameInput.value.trim();
    const initMod = parseInt(npcInitInput.value) || 0;
    
    if (!name) {
        showCustomAlert('Please enter an NPC name');
        return;
    }
    
    const npc = {
        id: Date.now().toString() + Math.random(),
        name: name,
        initModifier: initMod,
        type: 'npc'
    };
    
    combatParticipants.push(npc);
    
    // Clear inputs
    npcNameInput.value = '';
    npcInitInput.value = '0';
    npcNameInput.focus();
    
    // Refresh the combined display
    const selectedPartyId = partySelect.value;
    displayPartyCharacters(selectedPartyId);
    
    checkCombatReadiness();
}

function removeNPC(npcId) {
    combatParticipants = combatParticipants.filter(p => p.id !== npcId);
    renderNPCList();
    checkCombatReadiness();
}

function renderNPCList() {
    const npcs = combatParticipants.filter(p => p.type === 'npc');
    npcList.innerHTML = npcs.map(npc => `
        <div class="npc-tag">
            ${escapeHtml(npc.name)} (${formatInitiativeModifier(npc.initModifier)})
            <button class="remove-npc" onclick="removeNPC('${npc.id}')">✕</button>
        </div>
    `).join('');
}

// Helper functions for NPC editing in the participants list
function updateNPCName(npcId, newName) {
    const npc = combatParticipants.find(p => p.id === npcId && p.type === 'npc');
    if (npc && newName.trim()) {
        npc.name = newName.trim();
        // No need to refresh display as the input is already updated
    }
}

function updateNPCInit(npcId, newInit) {
    const npc = combatParticipants.find(p => p.id === npcId && p.type === 'npc');
    if (npc) {
        npc.initModifier = parseInt(newInit) || 0;
        // No need to refresh display as the input is already updated
    }
}

function removeNPCFromList(npcId) {
    combatParticipants = combatParticipants.filter(p => p.id !== npcId);
    
    // Refresh the combined display
    const selectedPartyId = partySelect.value;
    displayPartyCharacters(selectedPartyId);
    
    checkCombatReadiness();
}

function checkCombatReadiness() {
    const selectedPartyId = partySelect.value;
    const hasParty = selectedPartyId && parties.find(p => p.id === selectedPartyId);
    const hasParticipants = hasParty || combatParticipants.length > 0;
    
    // Display party characters when a party is selected
    displayPartyCharacters(selectedPartyId);
    
    if (hasParty && !combatParticipants.find(p => p.type === 'pc')) {
        // Add party characters to combat participants
        const party = parties.find(p => p.id === selectedPartyId);
        party.characters.forEach(char => {
            if (!combatParticipants.find(p => p.id === char.id)) {
                combatParticipants.push({
                    ...char,
                    type: 'pc',
                    partyId: party.id
                });
            }
        });
    }
    
    startCombatBtn.style.display = hasParticipants ? 'block' : 'none';
}

// Listen for party selection changes
if (partySelect) {
    partySelect.addEventListener('change', checkCombatReadiness);
}

function startCombat() {
    if (combatParticipants.length === 0) {
        showCustomAlert('Add some participants first!');
        return;
    }
    
    // Check if manual roll mode is enabled
    if (manualRollMode && manualRollMode.checked) {
        showManualRollModal();
        return;
    }
    
    // Automatic rolling
    combatParticipants.forEach(participant => {
        const roll = Math.floor(Math.random() * 20) + 1;
        participant.initiative = roll + participant.initModifier;
        participant.rollResult = roll;
    });
    
    finalizeCombatStart();
}

function showManualRollModal() {
    // Generate manual roll inputs for each participant
    manualRollInputs.innerHTML = combatParticipants.map((participant, index) => `
        <div class="manual-roll-item">
            <div class="manual-roll-character">
                <span class="character-type-tag ${participant.type}">${participant.type === 'pc' ? 'PC' : 'NPC'}</span>
                <span class="manual-roll-character-name">${escapeHtml(participant.name)}</span>
                <span class="manual-roll-modifier">(${formatInitiativeModifier(participant.initModifier)})</span>
            </div>
            <div class="manual-roll-input-section">
                <label>d20:</label>
                <input type="number" 
                       class="manual-roll-input" 
                       data-index="${index}"
                       min="1" max="20" 
                       placeholder="1-20"
                       required>
                <span>=</span>
                <span class="manual-roll-result" data-result-index="${index}">-</span>
            </div>
        </div>
    `).join('');
    
    // Add real-time calculation
    manualRollInputs.querySelectorAll('.manual-roll-input').forEach(input => {
        input.addEventListener('input', updateManualRollResult);
    });
    
    manualRollModal.style.display = 'flex';
    
    // Focus first input
    const firstInput = manualRollInputs.querySelector('.manual-roll-input');
    if (firstInput) firstInput.focus();
}

function updateManualRollResult(event) {
    const input = event.target;
    const index = input.dataset.index;
    const resultSpan = manualRollInputs.querySelector(`[data-result-index="${index}"]`);
    const participant = combatParticipants[index];
    
    const roll = parseInt(input.value);
    
    // Validation
    if (isNaN(roll) || roll < 1 || roll > 20) {
        input.classList.add('invalid');
        resultSpan.textContent = '-';
        return;
    }
    
    input.classList.remove('invalid');
    const total = roll + participant.initModifier;
    resultSpan.textContent = total;
}

function startCombatWithManualRolls() {
    const inputs = manualRollInputs.querySelectorAll('.manual-roll-input');
    const rolls = [];
    let hasErrors = false;
    
    // Validate all inputs
    inputs.forEach((input, index) => {
        const roll = parseInt(input.value);
        if (isNaN(roll) || roll < 1 || roll > 20) {
            input.classList.add('invalid');
            hasErrors = true;
        } else {
            input.classList.remove('invalid');
            rolls[index] = roll;
        }
    });
    
    if (hasErrors) {
        showCustomAlert('Please enter valid dice rolls (1-20) for all participants.');
        return;
    }
    
    // Apply manual rolls
    combatParticipants.forEach((participant, index) => {
        const roll = rolls[index];
        participant.initiative = roll + participant.initModifier;
        participant.rollResult = roll;
    });
    
    manualRollModal.style.display = 'none';
    finalizeCombatStart();
}

function finalizeCombatStart() {
    // Sort by initiative (highest first)
    combatParticipants.sort((a, b) => b.initiative - a.initiative);
    
    // Set up combat state
    currentCombat = {
        participants: combatParticipants,
        round: 1,
        currentTurnIndex: 0,
        startedAt: new Date().toISOString()
    };
    
    saveCombatState();
    showCombatTracker();
    renderInitiativeOrder();
    
    // Enable fullscreen combat mode
    document.body.classList.add('fullscreen-combat');
}

function updateStartButtonText() {
    if (startCombatBtn) {
        if (manualRollMode && manualRollMode.checked) {
            startCombatBtn.textContent = '⚔️ Enter Manual Rolls & Start Combat';
        } else {
            startCombatBtn.textContent = '🎲 Roll Initiative & Start Combat';
        }
    }
}

function showCombatTracker() {
    combatSetup.style.display = 'none';
    combatTracker.style.display = 'block';
    endCombatBtn.style.display = 'block';
}

function renderInitiativeOrder() {
    if (!currentCombat) return;
    
    // Update round and turn info
    currentRound.textContent = currentCombat.round;
    const currentParticipant = currentCombat.participants[currentCombat.currentTurnIndex];
    currentTurn.textContent = currentParticipant ? currentParticipant.name : '-';
    
    initiativeOrder.innerHTML = currentCombat.participants.map((participant, index) => `
        <div class="initiative-item ${index === currentCombat.currentTurnIndex ? 'current-turn' : ''}" 
             draggable="true" 
             data-index="${index}">
            <div class="initiative-info">
                <div class="initiative-rank">${participant.initiative}</div>
                <span class="character-type-tag ${participant.type}">${participant.type === 'pc' ? 'PC' : 'NPC'}</span>
                <div class="character-info">
                    <div class="character-name-combat">${escapeHtml(participant.name)}</div>
                </div>
            </div>
            <div class="initiative-details">
                <small>Roll: ${formatInitiativeRoll(participant.rollResult, participant.initModifier)}</small>
            </div>
        </div>
    `).join('');
    
    // Add drag and drop event listeners
    setupDragAndDrop();
}

let draggedIndex = null;
let touchStartY = 0;
let touchStartElement = null;
let isDragging = false;
let dragPlaceholder = null;
let originalParent = null;
let originalNextSibling = null;

function setupDragAndDrop() {
    const items = initiativeOrder.querySelectorAll('.initiative-item');
    
    // Add dragover and drop to the container itself
    initiativeOrder.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    
    initiativeOrder.addEventListener('drop', (e) => {
        e.preventDefault();
        
        // Calculate new position based on placeholder location
        let newIndex = draggedIndex; // Default to original position
        
        if (dragPlaceholder && dragPlaceholder.parentNode) {
            // Get all initiative items in the container
            const container = dragPlaceholder.parentNode;
            const allItems = Array.from(container.children);
            
            // Find placeholder position and count real items before it
            const placeholderPos = allItems.indexOf(dragPlaceholder);
            newIndex = 0;
            
            for (let i = 0; i < placeholderPos; i++) {
                const child = allItems[i];
                if (child.classList.contains('initiative-item') && 
                    !child.classList.contains('drag-placeholder') &&
                    !child.classList.contains('dragging')) {
                    newIndex++;
                }
            }
            
            // Remove placeholder immediately
            dragPlaceholder.parentNode.removeChild(dragPlaceholder);
            dragPlaceholder = null;
        }
        
        // Only reorder if position actually changed
        if (newIndex !== draggedIndex && draggedIndex !== null) {
            reorderInitiativeList(draggedIndex, newIndex);
        }
    });
    
    items.forEach((item, index) => {
        // Make sure the item is draggable
        item.setAttribute('draggable', 'true');
        
        // Force draggable and check if drag events fire
        item.draggable = true;
        
        // Enhanced desktop drag and drop events with live preview
        item.addEventListener('dragstart', (e) => {
            draggedIndex = index;
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', item.outerHTML);
            
            // Store original position for restoration if needed
            originalParent = item.parentNode;
            originalNextSibling = item.nextSibling;
        }, true); // Use capture phase
        
        item.addEventListener('dragend', (e) => {
            // Clean up visual styles
            item.classList.remove('dragging');
            item.style.opacity = '';
            items.forEach(i => i.classList.remove('drag-over'));
            
            // Clean up placeholder if it still exists
            setTimeout(() => {
                if (dragPlaceholder && dragPlaceholder.parentNode) {
                    dragPlaceholder.parentNode.removeChild(dragPlaceholder);
                    dragPlaceholder = null;
                }
                draggedIndex = null;
            }, 0);
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            // Create placeholder on first dragover if it doesn't exist
            if (!dragPlaceholder && draggedIndex !== null) {
                dragPlaceholder = document.createElement('div');
                dragPlaceholder.className = 'initiative-item drag-placeholder';
                dragPlaceholder.style.height = '60px';
                dragPlaceholder.style.opacity = '0.3';
                dragPlaceholder.style.border = '2px dashed #64748b';
                dragPlaceholder.style.background = 'rgba(100, 116, 139, 0.1)';
                dragPlaceholder.innerHTML = '<div style="text-align: center; padding: 1rem; color: #64748b;">Drop here</div>';
            }
            
            // Update placeholder position
            if (dragPlaceholder && draggedIndex !== index) {
                const container = item.parentNode;
                const rect = item.getBoundingClientRect();
                const dragY = e.clientY;
                const targetCenter = rect.top + rect.height / 2;
                
                try {
                    if (dragY < targetCenter) {
                        container.insertBefore(dragPlaceholder, item);
                    } else {
                        const nextSibling = item.nextSibling;
                        if (nextSibling) {
                            container.insertBefore(dragPlaceholder, nextSibling);
                        } else {
                            container.appendChild(dragPlaceholder);
                        }
                    }
                } catch (error) {
                    // Silently handle drag positioning errors
                }
            }
        });
        
        item.addEventListener('dragenter', (e) => {
            e.preventDefault();
        });
        
        item.addEventListener('dragleave', (e) => {
            // Only handle if we're leaving the container entirely
            if (!e.currentTarget.contains(e.relatedTarget)) {
                // Don't remove placeholder here, let dragover handle positioning
            }
        });

        // Enhanced touch events for mobile devices with live preview
        item.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartElement = item;
            draggedIndex = index;
            isDragging = false;
            
            // Store original position for restoration if needed
            originalParent = item.parentNode;
            originalNextSibling = item.nextSibling;
            
            // Add a slight delay before considering it a drag
            setTimeout(() => {
                if (touchStartElement === item) {
                    isDragging = true;
                    
                    // Create a visual placeholder
                    dragPlaceholder = document.createElement('div');
                    dragPlaceholder.className = 'initiative-item drag-placeholder';
                    dragPlaceholder.style.height = item.offsetHeight + 'px';
                    dragPlaceholder.style.opacity = '0.3';
                    dragPlaceholder.style.border = '2px dashed #64748b';
                    dragPlaceholder.style.background = 'rgba(100, 116, 139, 0.1)';
                    dragPlaceholder.innerHTML = '<div style="text-align: center; padding: 1rem; color: #64748b;">Drop here</div>';
                    
                    // Insert placeholder at current position
                    originalParent.insertBefore(dragPlaceholder, item);
                    
                    // Style the dragged item
                    item.classList.add('dragging');
                    item.style.position = 'fixed';
                    item.style.zIndex = '9999';
                    item.style.pointerEvents = 'none';
                    item.style.width = item.offsetWidth + 'px';
                    
                    // Prevent scrolling while dragging
                    document.body.style.overflow = 'hidden';
                    
                    // Position the item at touch point
                    updateDragPosition(e.touches[0]);
                }
            }, 200);
        }, { passive: true });

        item.addEventListener('touchmove', (e) => {
            if (!isDragging || touchStartElement !== item) return;
            
            e.preventDefault();
            const touch = e.touches[0];
            
            // Update dragged item position
            updateDragPosition(touch);
            
            // Find drop target and update placeholder position
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const targetItem = elementBelow?.closest('.initiative-item:not(.drag-placeholder):not(.dragging)');
            
            if (targetItem && dragPlaceholder) {
                const container = targetItem.parentNode;
                const targetRect = targetItem.getBoundingClientRect();
                const touchY = touch.clientY;
                
                // Determine if we should insert before or after the target
                const targetCenter = targetRect.top + targetRect.height / 2;
                
                if (touchY < targetCenter) {
                    // Insert placeholder before target
                    container.insertBefore(dragPlaceholder, targetItem);
                } else {
                    // Insert placeholder after target
                    const nextSibling = targetItem.nextSibling;
                    if (nextSibling) {
                        container.insertBefore(dragPlaceholder, nextSibling);
                    } else {
                        container.appendChild(dragPlaceholder);
                    }
                }
            }
        }, { passive: false });

        item.addEventListener('touchend', (e) => {
            if (!isDragging || touchStartElement !== item) {
                touchStartElement = null;
                isDragging = false;
                return;
            }
            
            // Get the final position from placeholder
            let newIndex = -1;
            if (dragPlaceholder && dragPlaceholder.parentNode) {
                const allItems = Array.from(dragPlaceholder.parentNode.children);
                newIndex = allItems.indexOf(dragPlaceholder);
                
                // Adjust index to account for the original item being removed
                if (newIndex > draggedIndex) {
                    newIndex--;
                }
            }
            
            // Clean up visual elements
            cleanupDragState(item);
            
            // Apply the reorder if position changed
            if (newIndex !== -1 && newIndex !== draggedIndex) {
                reorderInitiativeList(draggedIndex, newIndex);
            } else {
                // If no valid drop, just re-render to restore original state
                renderInitiativeOrder();
            }
            
            resetDragVariables();
        }, { passive: true });

        item.addEventListener('touchcancel', (e) => {
            if (isDragging && touchStartElement === item) {
                cleanupDragState(item);
                renderInitiativeOrder(); // Restore original state
            }
            resetDragVariables();
        }, { passive: true });
    });
}

function updateDragPosition(touch) {
    if (touchStartElement) {
        const rect = touchStartElement.getBoundingClientRect();
        touchStartElement.style.left = (touch.clientX - rect.width / 2) + 'px';
        touchStartElement.style.top = (touch.clientY - rect.height / 2) + 'px';
    }
}

function cleanupDragState(item) {
    // Remove placeholder
    if (dragPlaceholder && dragPlaceholder.parentNode) {
        dragPlaceholder.parentNode.removeChild(dragPlaceholder);
    }
    
    // Reset dragged item styles
    item.classList.remove('dragging');
    item.style.position = '';
    item.style.zIndex = '';
    item.style.pointerEvents = '';
    item.style.width = '';
    item.style.left = '';
    item.style.top = '';
    
    // Restore scrolling
    document.body.style.overflow = '';
}

function resetDragVariables() {
    draggedIndex = null;
    touchStartElement = null;
    isDragging = false;
    dragPlaceholder = null;
    originalParent = null;
    originalNextSibling = null;
}

function reorderInitiativeList(fromIndex, toIndex) {
    if (!currentCombat || fromIndex === toIndex) {
        return;
    }
    
    // Get the participants array
    const participants = currentCombat.participants;
    
    // Remember the current turn participant before reordering
    const currentTurnParticipant = participants[currentCombat.currentTurnIndex];
    
    // Remove the dragged item and insert it at the new position
    const [draggedItem] = participants.splice(fromIndex, 1);
    participants.splice(toIndex, 0, draggedItem);
    
    // Update the current turn index to follow the moved participant
    const newCurrentTurnIndex = participants.findIndex(p => p === currentTurnParticipant);
    currentCombat.currentTurnIndex = newCurrentTurnIndex;
    
    // Save the updated combat state
    saveCombatState();
    
    // Re-render the initiative order
    renderInitiativeOrder();
}

function nextTurn() {
    if (!currentCombat) return;
    
    currentCombat.currentTurnIndex++;
    
    // Check if round is complete
    if (currentCombat.currentTurnIndex >= currentCombat.participants.length) {
        currentCombat.currentTurnIndex = 0;
        currentCombat.round++;
    }
    
    saveCombatState();
    renderInitiativeOrder();
}

async function endCombat() {
    const confirmed = await showCustomConfirm('Are you sure you want to end this combat?', 'End Combat');
    if (confirmed) {
        // Store NPCs before clearing combatParticipants
        const npcsToKeep = combatParticipants.filter(p => p.type === 'npc');
        
        currentCombat = null;
        combatParticipants = [...npcsToKeep]; // Keep NPCs for next combat
        localStorage.removeItem('currentCombat');
        
        combatSetup.style.display = 'block';
        combatTracker.style.display = 'none';
        endCombatBtn.style.display = 'none';
        
        // Disable fullscreen combat mode
        document.body.classList.remove('fullscreen-combat');
        
        // Keep the party selected - don't reset partySelect.value
        // Keep NPCs in the display since we preserved them in combatParticipants
        
        // Re-check combat readiness to restore the setup state
        checkCombatReadiness();
    }
}

function saveCombatState() {
    localStorage.setItem('currentCombat', JSON.stringify(currentCombat));
}

// Utility functions
function checkOnlineStatus() {
    if (navigator.onLine) {
        offlineIndicator.style.display = 'none';
    } else {
        offlineIndicator.style.display = 'block';
    }
}

function formatInitiativeModifier(modifier) {
    if (modifier >= 0) {
        return `+${modifier}`;
    } else {
        return `${modifier}`; // Already includes the minus sign
    }
}

function formatInitiativeRoll(rollResult, modifier) {
    if (modifier >= 0) {
        return `${rollResult} + ${modifier}`;
    } else {
        return `${rollResult} - ${Math.abs(modifier)}`;
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Custom Modal Functions
function showCustomAlert(message, title = 'Alert') {
    return new Promise((resolve) => {
        customAlertTitle.textContent = title;
        customAlertMessage.textContent = message;
        customAlertModal.style.display = 'flex';
        
        const handleOk = () => {
            customAlertModal.style.display = 'none';
            customAlertOkBtn.removeEventListener('click', handleOk);
            resolve();
        };
        
        customAlertOkBtn.addEventListener('click', handleOk);
        
        // Close on backdrop click
        customAlertModal.addEventListener('click', (e) => {
            if (e.target === customAlertModal) {
                handleOk();
            }
        });
    });
}

function showCustomConfirm(message, title = 'Confirm') {
    return new Promise((resolve) => {
        customConfirmTitle.textContent = title;
        customConfirmMessage.textContent = message;
        customConfirmModal.style.display = 'flex';
        
        const handleResult = (result) => {
            customConfirmModal.style.display = 'none';
            customConfirmOkBtn.removeEventListener('click', handleOk);
            customConfirmCancelBtn.removeEventListener('click', handleCancel);
            resolve(result);
        };
        
        const handleOk = () => handleResult(true);
        const handleCancel = () => handleResult(false);
        
        customConfirmOkBtn.addEventListener('click', handleOk);
        customConfirmCancelBtn.addEventListener('click', handleCancel);
        
        // Close on backdrop click (cancel)
        customConfirmModal.addEventListener('click', (e) => {
            if (e.target === customConfirmModal) {
                handleCancel();
            }
        });
    });
}

// PWA lifecycle events
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    installButton.style.display = 'none';
});

// Handle app updates
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

// Burger menu functionality
function setupBurgerMenu() {
    const burgerBtn = document.getElementById('burgerMenuBtn');
    const burgerDropdown = document.getElementById('burgerDropdown');
    
    if (burgerBtn && burgerDropdown) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerBtn.classList.toggle('active');
            burgerDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!burgerBtn.contains(e.target) && !burgerDropdown.contains(e.target)) {
                burgerBtn.classList.remove('active');
                burgerDropdown.classList.remove('show');
            }
        });
        
        // Handle dropdown item clicks
        const dropdownItems = burgerDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabName = item.dataset.tab;
                if (tabName) {
                    switchTab(tabName);
                    burgerBtn.classList.remove('active');
                    burgerDropdown.classList.remove('show');
                }
            });
        });
    }
}

// Theme management
function setupThemeToggle() {
    const lightThemeRadio = document.getElementById('lightTheme');
    const darkThemeRadio = document.getElementById('darkTheme');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    if (savedTheme === 'dark') {
        darkThemeRadio.checked = true;
    } else {
        lightThemeRadio.checked = true;
    }
    
    // Theme change listeners
    if (lightThemeRadio && darkThemeRadio) {
        lightThemeRadio.addEventListener('change', () => {
            if (lightThemeRadio.checked) {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            }
        });
        
        darkThemeRadio.addEventListener('change', () => {
            if (darkThemeRadio.checked) {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

function applyTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
}

// Settings functionality
function setupSettings() {
    const saveSettingsBtn = document.getElementById('saveSettings');
    const resetSettingsBtn = document.getElementById('resetSettings');
    const defaultInitModeSelect = document.getElementById('defaultInitMode');
    
    // Load saved settings
    const savedInitMode = localStorage.getItem('defaultInitMode') || 'auto';
    if (defaultInitModeSelect) {
        defaultInitModeSelect.value = savedInitMode;
    }
    
    // Save settings
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            if (defaultInitModeSelect) {
                localStorage.setItem('defaultInitMode', defaultInitModeSelect.value);
            }
            showCustomAlert('Settings Saved', 'Your settings have been saved successfully!');
        });
    }
    
    // Reset settings
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', () => {
            showCustomConfirm(
                'Reset Settings',
                'Are you sure you want to reset all settings to their default values?',
                () => {
                    // Reset to defaults
                    localStorage.setItem('theme', 'light');
                    localStorage.setItem('defaultInitMode', 'auto');
                    
                    // Update UI
                    applyTheme('light');
                    document.getElementById('lightTheme').checked = true;
                    if (defaultInitModeSelect) {
                        defaultInitModeSelect.value = 'auto';
                    }
                    
                    showCustomAlert('Settings Reset', 'All settings have been reset to their default values.');
                }
            );
        });
    }
}

// Setup scroll indicators for better iOS UX
function setupScrollIndicators() {
    console.log('Setting up scroll indicators for iOS...');
    
    // Debug function to check scrolling
    function debugScrolling() {
        const app = document.getElementById('app');
        const mainContent = document.querySelector('.main-content');
        
        console.log('App element:', app);
        console.log('App scrollHeight:', app?.scrollHeight);
        console.log('App clientHeight:', app?.clientHeight);
        console.log('App can scroll:', app?.scrollHeight > app?.clientHeight);
        
        console.log('Main content:', mainContent);
        console.log('Main content scrollHeight:', mainContent?.scrollHeight);
        console.log('Main content clientHeight:', mainContent?.clientHeight);
        console.log('Main content can scroll:', mainContent?.scrollHeight > mainContent?.clientHeight);
    }
    
    // Force scrollbar visibility on iOS by ensuring proper CSS
    function ensureScrollbarVisibility() {
        const app = document.getElementById('app');
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (app && isIOS) {
            // Add iOS-specific class for enhanced scrollbar styling
            app.classList.add('ios-device');
            console.log('iOS device detected, applying special styling');
            
            // Temporarily scroll to show scrollbar
            const currentScroll = app.scrollTop;
            app.scrollTop = currentScroll + 1;
            setTimeout(() => {
                app.scrollTop = currentScroll;
            }, 10);
        }
        
        // Debug scrolling
        debugScrolling();
    }
    
    // Check scrollable content and add indicators
    function checkScrollableContent() {
        const scrollableElements = document.querySelectorAll('.main-content, .tab-content, .about-container, .settings-container, .modal-body, .party-list, .initiative-order');
        
        scrollableElements.forEach(element => {
            if (element.scrollHeight > element.clientHeight) {
                element.classList.add('scroll-indicator');
                if (element.scrollTop + element.clientHeight < element.scrollHeight - 10) {
                    element.classList.add('has-scroll');
                } else {
                    element.classList.remove('has-scroll');
                }
            } else {
                element.classList.remove('scroll-indicator', 'has-scroll');
            }
        });
    }
    
    // Ensure scrollbars are visible when switching tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                ensureScrollbarVisibility();
                checkScrollableContent();
            }, 100);
        });
    });
    
    // Initial setup
    ensureScrollbarVisibility();
    checkScrollableContent();
    
    // Recheck on resize
    window.addEventListener('resize', () => {
        setTimeout(checkScrollableContent, 100);
    });
    
    // Recheck when content changes
    const observer = new MutationObserver(() => {
        setTimeout(checkScrollableContent, 100);
    });
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        observer.observe(mainContent, { childList: true, subtree: true });
    }
}

// Export functions for global access
window.openPartyModal = openPartyModal;
window.deleteParty = deleteParty;
window.removeCharacterInput = removeCharacterInput;
window.removeNPC = removeNPC;

// Test functions for debugging
window.testNewParty = function() {
    console.log('Test New Party clicked!');
    openPartyModal();
};

window.testNewCombat = function() {
    console.log('Test New Combat clicked!');
    startNewCombat();
};
