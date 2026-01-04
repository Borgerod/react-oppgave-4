import Navbar from "./navbar";
import {
	getTopicOptions,
	getFormatOptions,
	getLanguageOptions,
} from "@/components/filters/filterOptions.server";

export default async function NavbarServer() {
	const [topicOptions, formatOptions, languageOptions] = await Promise.all([
		getTopicOptions(),
		getFormatOptions(),
		getLanguageOptions(),
	]);
	return (
		<Navbar
			topicOptions={topicOptions}
			formatOptions={formatOptions}
			languageOptions={languageOptions}
		/>
	);
}
