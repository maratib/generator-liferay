module.exports = {
	// Language
	language: `javax.portlet.title.<?= packageGroup ?>=<?= portletName ?>
<?= portletName.toLowerCase() ?>.caption=Hello from <?= portletName ?>!`,

	// Bnd
	bnd: `Bundle-Name: <?= projectName ?>
Bundle-SymbolicName: <?= packageName ?>
Bundle-Version: 1.0.0
Export-Package: <?= packageName ?>.constants
Provide-Capability:\\
	liferay.language.resources;\\
  		resource.bundle.base.name="content.Language"`,
	// ViewJSP
	viewJSP: `<%@ include file="/init.jsp" %>

<p>
    <b><liferay-ui:message key="<?= portletName.toLowerCase() ?>.caption"/></b>
</p>`,

	// Portlet Class
	portlet: `package <?= packageName ?>.portlet;

import <?= packageName ?>.constants.<?= portletName ?>Keys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import javax.portlet.Portlet;
import org.osgi.service.component.annotations.Component;

/**
 * @author name
 */
@Component(
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.header-portlet-css=/css/main.css",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.display-name=<?= portletName ?>",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.name=" + <?= portletName ?>Keys.<?= portletName.toUpperCase() ?>,
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class <?= portletName ?> extends MVCPortlet {
}`,

	portletConstants: `package <?= packageName ?>.constants;

/**
 * @author name
 */
public class <?= portletName ?>Keys {

	public static final String <?= portletName.toUpperCase() ?> =
		"<?= packageGroup ?>";

}
`
};
