export interface PopupToBackground {
  openClient(options: { path: string; features: string }): Promise<void>;
}

export interface BackgroundToClient {
  changeTextDisplay(options: { status: boolean }): Promise<{ status: boolean }>;
}

export interface ClientToBackground {
  toggleText(options: { status: boolean }): Promise<{ status: boolean }>;
}
