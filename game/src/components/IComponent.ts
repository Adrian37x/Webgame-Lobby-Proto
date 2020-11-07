export interface IComponent {
    onRender(): void;
    onDestroy?: () => void;
}