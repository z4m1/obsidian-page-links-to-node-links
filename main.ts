

// 現在のファイルがキャンバスかどうか判定する。

import {
	App, 
	Editor, 
	MarkdownView, 
	Modal, 
	Notice, 
	Plugin, 
	PluginSettingTab, 
	Setting,
} from 'obsidian';

export default class MyPlugin extends Plugin {
	async onload() {
		// リボン（左サイドメニュー）にアイコンを追加する。
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// ここに動作を記述。
			if (this.is_active_leaf_canvas()) {
				new Notice('True');
			}
			else {
				new Notice('False');
			}
		});
		// HTMLのクラスを追加する。（多分外部から参照する際に必要になる？）
		ribbonIconEl.addClass('my-plugin-ribbon-class');
	}

	onunload() {

	}

	is_active_leaf_canvas = () =>  this.app.workspace.activeLeaf?.view.getViewType() === "canvas"
}