export type ScrollDirection = 'idle' | 'up' | 'down';

export interface ScrollSnapshot {
    scrollY: number;
    direction: ScrollDirection;
    delta: number;
}

type Listener = () => void;

const DIRECTION_THRESHOLD = 8;

const serverSnapshot: ScrollSnapshot = {
    scrollY: 0,
    direction: 'idle',
    delta: 0,
};

let snapshot: ScrollSnapshot = serverSnapshot;
let directionAnchor = 0;
let latestScrollY = 0;
let animationFrameId: number | null = null;
let isListening = false;

const listeners = new Set<Listener>();

const readScrollY = () => Math.max(0, window.scrollY);

const emitChange = () => {
    listeners.forEach(listener => listener());
};

const updateSnapshot = () => {
    animationFrameId = null;

    const scrollY = latestScrollY;
    const delta = scrollY - directionAnchor;

    if (scrollY === snapshot.scrollY) return;

    let direction = snapshot.direction;

    if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        direction = delta > 0 ? 'down' : 'up';
        directionAnchor = scrollY;
    }

    // Snapshot jest zastępowany tylko wtedy, gdy dane rzeczywiście się zmieniły.
    // getSnapshot musi zwracać tę samą referencję pomiędzy zmianami store'a.
    snapshot = {
        scrollY,
        direction,
        delta,
    };

    emitChange();
};

const handleScroll = () => {
    latestScrollY = readScrollY();

    if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateSnapshot);
    }
};

const startListening = () => {
    if (isListening) return;

    isListening = true;
    latestScrollY = readScrollY();
    directionAnchor = latestScrollY;
    snapshot = {
        scrollY: latestScrollY,
        direction: 'idle',
        delta: 0,
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
};

const stopListening = () => {
    if (!isListening) return;

    window.removeEventListener('scroll', handleScroll);

    if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    isListening = false;
};

export const scrollStore = {
    subscribe(listener: Listener) {
        listeners.add(listener);

        if (listeners.size === 1) {
            startListening();
        }

        return () => {
            listeners.delete(listener);

            if (listeners.size === 0) {
                stopListening();
            }
        };
    },
    getSnapshot() {
        return snapshot;
    },
    getServerSnapshot() {
        return serverSnapshot;
    },
};
