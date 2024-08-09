

// 不必要な箇所の消去と整形

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
			new Notice('This is a notice!');
		});
		// HTMLのクラスを追加する。（多分外部から参照する際に必要になる？）
		ribbonIconEl.addClass('my-plugin-ribbon-class');
	}

	onunload() {

	}
}