package org.getaviz.generator;

import java.io.File;
import java.awt.Color;

import org.apache.commons.configuration2.PropertiesConfiguration;
import org.apache.commons.configuration2.builder.fluent.Configurations;
import org.apache.commons.configuration2.ex.ConfigurationException;
import org.getaviz.generator.SettingsConfiguration.Bricks.Layout;
import org.getaviz.generator.SettingsConfiguration.Original.BuildingMetric;
import org.getaviz.generator.SettingsConfiguration.Panels.SeparatorModes;

public class SettingsConfiguration {
	private static PropertiesConfiguration config;
	private static SettingsConfiguration instance = null;

	private SettingsConfiguration() {
	}

	public static SettingsConfiguration getInstance() {
		if (instance == null) {
			instance = new SettingsConfiguration();
			loadConfig("./settings.properties");
		}
		return instance;
	}

	public static SettingsConfiguration getInstance(String path) {
		if (instance == null) {
			instance = new SettingsConfiguration();
		}
		loadConfig(path);
		return instance;
	}

	private static void loadConfig(String path) {
		File file = new File(path);
		try {
			Configurations configs = new Configurations();
			config = configs.properties(file);
		} catch (ConfigurationException cex) {
			System.out.println(cex);
		}
	}

	public void loadDefault() {
		loadConfig("./settings.properties");
	}
	
	public Metaphor getMetaphor() {
		String metaphor = config.getString("metaphor", "rdr");
		switch (metaphor) {
			case "city":
				return Metaphor.CITY;
			default:
				return Metaphor.RD;
		}
	}
	
	public String getOutputPath() {
		return config.getString("output.path", "./output/");
	}
	
	public String getRepositoryName() {
		return config.getString("history.repository_name", "");
	}

	public String getRepositoryOwner() {
		return config.getString("history.repository_owner", "");
	}

	public String getDatabaseName() {
		return config.getString("database_name", "../databases/graph.db");
	}

	public OutputFormat getOutputFormat() {
		switch (config.getString("output.format", "x3d")) {
		case "aframe":
			return OutputFormat.AFrame;
		default:
			return OutputFormat.X3D;
		}
	}
	
	public String getBuildingTypeAsString() {
		return config.getString("city.building_type", "original");
	}

	public BuildingType getBuildingType() {
		String value = config.getString("city.building_type", "original");
		switch (value) {
		case "panels":
			return BuildingType.CITY_PANELS;
		case "bricks":
			return BuildingType.CITY_BRICKS;
		case "floor":
			return BuildingType.CITY_FLOOR;
		default:
			return BuildingType.CITY_ORIGINAL;
		}
	}

	public Schemes getScheme() {
		String value = config.getString("city.scheme", "types");
		switch (value) {
		case "visibility":
			return Schemes.VISIBILITY;
		default:
			return Schemes.TYPES;
		}
	}

	public ClassElementsModes getClassElementsMode() {
		String value = config.getString("city.class_elements_mode", "methods_and_attributes");
		switch (value) {
		case "methods_only":
			return ClassElementsModes.METHODS_ONLY;
		case "attributes_only":
			return ClassElementsModes.ATTRIBUTES_ONLY;
		default:
			return ClassElementsModes.METHODS_AND_ATTRIBUTES;
		}
	}

	public ClassElementsSortModesCoarse getClassElementsSortModeCoarse() {
		String value = config.getString("city.class_elements_sort_mode_coarse", "methods_first");
		switch (value) {
		case "unsorted":
			return ClassElementsSortModesCoarse.UNSORTED;
		case "attributes_first":
			return ClassElementsSortModesCoarse.ATTRIBUTES_FIRST;
		default:
			return ClassElementsSortModesCoarse.METHODS_FIRST;
		}
	}

	public ClassElementsSortModesFine getClassElementsSortModeFine() {
		String value = config.getString("city.elements_sort_mode_fine", "scheme");
		switch (value) {
		case "unsorted":
			return ClassElementsSortModesFine.UNSORTED;
		case "alphabetically":
			return ClassElementsSortModesFine.ALPHABETICALLY;
		case "nos":
			return ClassElementsSortModesFine.NOS;
		default:
			return ClassElementsSortModesFine.SCHEME;
		}
	}

	public boolean isClassElementsSortModeFineDirectionReversed() {
		return config.getBoolean("city.class_elements_sort_mode_fine_direction_reversed", false);
	}

	public boolean isShowBuildingBase() {
		return config.getBoolean("city.building_base", true);
	}

	public Layout getBrickLayout() {
		String brickLayout = config.getString("city.brick.layout", "progressive");
		switch (brickLayout) {
		case "straight":
			return Layout.STRAIGHT;
		case "balanced":
			return Layout.BALANCED;
		default:
			return Layout.PROGRESSIVE;
		}
	}

	public double getBrickSize() {
		return config.getDouble("city.brick.size", 1.0);
	}

	public double getBrickHorizontalMargin() {
		return config.getDouble("city.brick.horizontal_margin", 0.5);
	}

	public double getBrickHorizontalGap() {
		return config.getDouble("city.brick.horizontal_gap", 0.2);
	}

	public double getBrickVerticalMargin() {
		return config.getDouble("city.brick.vertical_margin", 0.2);
	}

	public double getBrickVerticalGap() {
		return config.getDouble("city.brick.vertical_gap", 0.2);
	}

	public boolean isShowAttributesAsCylinders() {
		return config.getBoolean("city.show_attributes_as_cylinders", true);
	}

	public SeparatorModes getPanelSeparatorMode() {
		String value = config.getString("city.panel_separator_mode", "separator");
		switch (value) {
		case "none":
			return SeparatorModes.NONE;
		case "gap":
			return SeparatorModes.GAP;
		default:
			return SeparatorModes.SEPARATOR;
		}
	}

	public int[] getPanelHeightTresholdNos() {
		int[] defaultValue = { 3, 6, 12, 24, 48, 96, 144, 192, 240 };
		String[] result = config.getStringArray("city.panel.height_treshold_nos");
		if (result.length == 0) {
			return defaultValue;
		} else {
			int[] value = new int[result.length];
			for (int i = 0; i < result.length; i++) {
				try {
					value[i] = Integer.parseInt(result[i]);
				System.out.print(value[i] +  " ");
				} catch(NumberFormatException e) {
					return defaultValue;
				}
				
			}
			return value;
		}
	}

	public double getPanelHeightUnit() {
		return config.getDouble("city.panel.height_unit", 0.5);
	}

	public double getPanelHorizontalMargin() {
		return config.getDouble("city.panel.horizontal_margin", 0.5);
	}

	public double getPanelVerticalMargin() {
		return config.getDouble("city.panel.vertical_margin", 0.25);
	}

	public double getPanelVerticalGap() {
		return config.getDouble("city.panel.vertical_gap", 0.125);
	}

	public double getPanelSeparatorHeight() {
		return config.getDouble("city.panel.separator_height", 0.125);
	}

	public BuildingMetric getOriginalBuildingMetric() {
		String value = config.getString("city.original_building_metric", "none");
		switch (value) {
		case "nos":
			return BuildingMetric.NOS;
		default:
			return BuildingMetric.NONE;
		}
	}

	public double getWidthMin() {
		return config.getDouble("city.width_min", 1.0);
	}

	public double getHeightMin() {
		return config.getDouble("city.height_min", 1.0);
	}

	public double getBuildingHorizontalMargin() {
		return config.getDouble("city.building.horizontal_margin", 3.0);
	}

	public double getBuildingHorizontalGap() {
		return config.getDouble("city.building.horizontal_gap", 3.0);
	}

	public double getBuildingVerticalMargin() {
		return config.getDouble("city.building.vertical_margin", 1.0);
	}

	public String getPackageColorHex() {
		return config.getString("city.package.color_start", "#969696");
	}

	public Color getPackageColorStart() {
		return getColor(config.getString("city.package.color_start", "#969696"));
	}

	public Color getPackageColorEnd() {
		return getColor(config.getString("city.package.color_end", "#f0f0f0"));
	}

	public String getClassColorHex() {
		return config.getString("city.class.color", "#353559");
	}

	public Color getClassColorStart() {
		return getColor(config.getString("city.class.color_start", "#131615"));
	}

	public Color getClassColorEnd() {
		return getColor(config.getString("city.class.color_end", "#00ff00"));
	}

	public Color getClassColor() {
		return getColor(config.getString("city.class.color", "#353559"));
	}

	public Color getDynamicClassColorStart() {
		return getColor(config.getString("city.dynamic.class.color_start", "#fa965c"));
	}

	public Color getDynamicClassColorEnd() {
		return getColor(config.getString("city.dynamic.class.color_end", "#feb280"));
	}

	public Color getDynamicMethodColor() {
		return getColor(config.getString("city.dynamic.method.color", "#735eb9"));
	}

	public Color getDynamicPackageColorStart() {
		return getColor(config.getString("city.dynamic.package.color_start", "#23862c"));
	}

	public Color getDynamicPackageColorEnd() {
		return getColor(config.getString("city.dynamic.package.color_end", "#7bcd8d"));
	}

	public Color getCityColor(String name) {
		return getColor(getCityColorHex(name));
	}

	public String getCityColorHex(String name) {
		String color = name.toLowerCase();
		String defaultColor = "";
		switch (name) {
		case "aqua":
			defaultColor = "#99CCFF"; break;
		case "blue":
			defaultColor = "#99FFCC"; break;
		case "light_green":
			defaultColor = "#CCFF99"; break;
		case "dark_green":
			defaultColor = "#99FF99"; break;
		case "yellow":
			defaultColor = "#FFFF99"; break;
		case "orange":
			defaultColor = "#FFCC99"; break;
		case "red":
			defaultColor = "#FF9999"; break;
		case "pink":
			defaultColor = "#FF99FF"; break;
		case "violet":
			defaultColor = "#9999FF"; break;
		case "light_grey":
			defaultColor = "#CCCCCC"; break;
		case "dark_grey":
			defaultColor = "#999999"; break;
		case "white":
			defaultColor = "#FFFFFF"; break;
		case "black":
			defaultColor = "#000000"; break;
		}
		return config.getString("city.color." + color, defaultColor);
	}

	public String getCityColorAsPercentage(String name) {
		return getColorFormatted(getCityColor(name));
	}
	
	public double getRDDataFactor() {
		return config.getDouble("rd.data_factor", 4.0);
	}

	public double getRDMethodFactor() {
		return config.getDouble("rd.method_factor", 1.0);
	}

	public double getRDHeight() {
		return config.getDouble("rd.height", 1.0);
	}

	public int getRDHeightBoost() {
		return config.getInt("rd.height_boost", 8);
	}

	public float getRDHeightMultiplicator() {
		return (float)config.getDouble("rd.height_multiplicator", 50.0);
	}

	public double getRDRingWidth() {
		return config.getDouble("rd.ring_width", 2.0);
	}

	public double getRDRingWidthMD() {
		return config.getDouble("rd.ring_width_md", 0);
	}

	public double getRDRingWidthAD() {
		return config.getDouble("rd.ring_width_ad", 0);
	}

	public double getRDMinArea() {
		return config.getDouble("rd.min_area", 10.0);
	}

	public double getRDNamespaceTransparency() {
		return config.getDouble("rd.namespace_transparency", 0);
	}

	public double getRDClassTransparency() {
		return config.getDouble("rd.class_transparency", 0);
	}

	public double getRDMethodTransparency() {
		return config.getDouble("rd.method_transparency", 0);
	}

	public double getRDDataTransparency() {
		return config.getDouble("rd.data_transparency", 0);
	}

	public Color getRDClassColor() {
		return getColor(getRDClassColorHex());
	}

	public String getRDClassColorHex() {
		return config.getString("rd.color.class", "#353559");
	}

	public String getRDClassColorAsPercentage() {
		return getColorFormatted(getRDClassColor());
	}

	public Color getRDDataColor() {
		return getColor(getRDDataColorHex());
	}

	public String getRDDataColorHex() {
		return config.getString("rd.color.data", "#fffc19");
	}

	public String getRDDataColorAsPercentage() {
		return getColorFormatted(getRDDataColor());
	}

	public Color getRDMethodColor() {
		return getColor(getRDMethodColorHex());
	}

	public String getRDMethodColorHex() {
		return config.getString("rd.color.method", "#1485cc");
	}

	public String getRDMethodColorAsPercentage() {
		return getColorFormatted(getRDMethodColor());
	}

	public Color getRDNamespaceColor() {
		return getColor(getRDNamespaceColorHex());
	}

	public String getRDNamespaceColorHex() {
		return config.getString("rd.color.namespace", "#969696");
	}

	public String getRDNamespaceColorAsPercentage() {
		return getColorFormatted(getRDNamespaceColor());
	}
	
	public boolean isMethodDisks() {
		return config.getBoolean("rd.method_disks", false);
	}

	public boolean isDataDisks() {
		return config.getBoolean("rd.data_disks", false);
	}

	public boolean isMethodTypeMode() {
		return config.getBoolean("rd.method_type_mode", false);
	}

	private String getColorFormatted(Color color) {
		double r = color.getRed() / 255.0;
		double g = color.getGreen() / 255.0;
		double b = color.getBlue() / 255.0;
		return r + " " + g + " " + b;
	}

	private Color getColor(String hex) {
		return Color.decode(hex);
	}

	public static enum OutputFormat {
		X3D, AFrame;
	}
	
	/**
	 * Sets in which way the Historic Evolution
	 * of the analyzed Software should be represented, 
	 * it can either be in a static or dynamic way 
	 */
	
	public static enum BuildingType{
		CITY_ORIGINAL, CITY_PANELS, CITY_BRICKS, CITY_FLOOR; 
	}
	
	/**
	 * Defines how the methods and attributes are sorted and colored in the city
	 * model.
	 * 
	 * @see CitySettings#SET_SCHEME SET_SCHEME
	 */
	public static enum Schemes {
		/**
		 * The class elements are sorted and colored corresponding to there
		 * visibility modifiers.
		 * 
		 * @see SortPriorities_Visibility
		 */
		VISIBILITY,

		/**
		 * The class elements are sorted and colored associated to
		 * type/functionality of the method.
		 * 
		 * @see Methods.SortPriorities_Types
		 * @see Attributes.SortPriorities_Types
		 */
		TYPES;
	};
	
	/**
	 * Defines which elements of a class are to show.
	 * 
	 * @see CitySettings#SET_CLASS_ELEMENTS_MODE SET_CLASS_ELEMENTS_MODE
	 */
	public static enum ClassElementsModes {
		METHODS_ONLY, ATTRIBUTES_ONLY, METHODS_AND_ATTRIBUTES;
	}
	
	/**
	 * Defines which how the elements of a class are sorted.
	 * 
	 * @see CitySettings#SET_CLASS_ELEMENTS_SORT_MODE_COARSE
	 *      SET_CLASS_ELEMENTS_SORT_MODE_COARSE
	 */
	public static enum ClassElementsSortModesCoarse {
		UNSORTED, ATTRIBUTES_FIRST, METHODS_FIRST;
	}

	/**
	 * A list of types of a method with the associated priority value.<br>
	 * Highest priority/smallest number is placed on the bottom, lowest on top.
	 * 
	 * @see #SET_CLASS_ELEMENTS_SORT_MODE_FINE SET_CLASS_ELEMENTS_SORT_MODE_FINE
	 * @see SortPriorities_Visibility
	 * @see Methods.SortPriorities_Types
	 * @see Attributes.SortPriorities_Types
	 */
	public static enum ClassElementsSortModesFine {
		/** Class elements won't be sorted. */
		UNSORTED,

		/** Methods will be sorted according to the name. */
		ALPHABETICALLY,

		/**
		 * Methods will be sorted according to the active
		 * {@link CitySettings#SET_CLASS_ELEMENTS_SORT_MODE_FINE
		 * SET_CLASS_ELEMENTS_SORT_MODE_FINE}.
		 */
		SCHEME,

		/** Methods will be sorted according to there number of statements. */
		NOS;
	}

	/**
	 * A list of visibility modifiers of a method with the associated priority
	 * value.<br>
	 * Highest priority/smallest number is placed on the bottom, lowest on top.
	 * 
	 * @see #SET_CLASS_ELEMENTS_SORT_MODE_FINE SET_CLASS_ELEMENTS_SORT_MODE_FINE
	 * @see ClassElementsSortModesFine
	 * 
	 */
	public static enum SortPriorities_Visibility {;
		public static int PRIVATE = 1;
		public static int PROTECTED = 2;
		public static int PACKAGE = 3;
		public static int PUBLIC = 4;
	}

	public static enum Methods {;

		/**
		 * A list of types of a method with the associated priority value.<br>
		 * Highest priority/smallest number is placed on the bottom, lowest on
		 * top.
		 * 
		 * @see CitySettings#SET_CLASS_ELEMENTS_SORT_MODE_FINE
		 *      SET_CLASS_ELEMENTS_SORT_MODE_FINE
		 * @see ClassElementsSortModesFine
		 * @see SortPriorities_Visibility
		 */
		public static enum SortPriorities_Types {;

			/**
			 * Method is a constructor.
			 */
			public static int CONSTRUCTOR = 1;

			/**
			 * The name of the method begins with "get".
			 */
			public static int GETTER = 2;

			/**
			 * The name of the method begins with "set".
			 */
			public static int SETTER = 3;

			/**
			 * Method has a {@code static} modifier.
			 */
			public static int STATIC = 4;

			/**
			 * Method has an {@code abstract} modifier.
			 */
			public static int ABSTRACT = 5;

			/**
			 * Every other type that isn't specified by the other constants in
			 * this field.
			 */
			public static int LEFTOVER = 6;
		}

	}

	public static enum Attributes {;

		/**
		 * A list of types of a method with the associated priority value.<br>
		 * Highest priority/smallest number is placed on the bottom, lowest on
		 * top.
		 * 
		 * @see CitySettings#SET_CLASS_ELEMENTS_SORT_MODE_FINE
		 *      SET_CLASS_ELEMENTS_SORT_MODE_FINE
		 * @see ClassElementsSortModesFine
		 */
		public static enum SortPriorities_Types {;

			/** Type is a primitive like {@code boolean}, {@code int}. */
			public static int PRIMITVE = 1;

			/** Type is a (Non-wrapper) class, collection, etc. */
			public static int COMPLEX = 2;

		}

	}

	public static enum Bricks {;

		/**
		 * Defines the layout for the BuildingSegments of the city model, which
		 * represents the methods and/or attributes of a class.
		 * 
		 * @see CitySettings#SET_BRICK_LAYOUT SET_BRICK_LAYOUT
		 */
		public static enum Layout {

			/**
			 * One-dimensional bricks layout, where the segments simply are
			 * placed on top of the other.
			 */
			STRAIGHT,

			/**
			 * Three-dimensional brick layout, where the base area is computed
			 * depending on the {@link CitySettings#SET_CLASS_ELEMENTS_MODE
			 * SET_CLASS_ELEMENTS_MODE}.<br>
			 * If only methods are shown, the base area is computed by the
			 * number of attributes and vice versa.<br>
			 * In case of methods and attributes are shown, the base area is
			 * computed by the sum of the numbers of attributes and methods
			 * inside the class.
			 * <p>
			 * When {@link CitySettings#SET_CLASS_ELEMENTS_MODE
			 * SET_CLASS_ELEMENTS_MODE} is set to
			 * {@code METHODS_AND_ATTRIBUTES}, the {@code BALANCED} layout and
			 * {@link Layout#PROGRESSIVE PROGRESSIVE} layout are identical.
			 */
			BALANCED,

			/**
			 * Three-dimensional brick layout, where the base area is computed
			 * depending on the {@link CitySettings#SET_CLASS_ELEMENTS_MODE
			 * SET_CLASS_ELEMENTS_MODE}.<br>
			 * If only methods are shown, the base area is computed by the
			 * number of methods and vice versa. So the aspect lies on only one
			 * type of element of a class and is visualized.
			 * <p>
			 * When {@link CitySettings#SET_CLASS_ELEMENTS_MODE
			 * SET_CLASS_ELEMENTS_MODE} is set to
			 * {@code METHODS_AND_ATTRIBUTES}, the {@link Layout#BALANCED
			 * PROGRESSIVE} layout and {@code PROGRESSIVE} layout are identical.
			 */
			PROGRESSIVE;

		}
	}

	public enum Panels {
		;

		/**
		 * Defines the the space between the panels.<br>
		 * The panels can either touch each other without a gap, leave a gap
		 * between them, or fill the space with a separator of a defined color.
		 * 
		 * @see CitySettings#SET_PANEL_SEPARATOR_MODE SET_PANEL_SEPARATOR_MODE
		 */
		public static enum SeparatorModes {

			/**
			 * No space between the panels and they are placed on top of each
			 * other.
			 */
			NONE,

			/**
			 * The panels have a free space between them and don't touch each
			 * other.
			 * 
			 * @see Panels#PANEL_VERTICAL_GAP PANEL_VERTICAL_GAP
			 */
			GAP,

			/**
			 * Between the panels separators are placed with a fix height and
			 * color.
			 * 
			 * @see Panels#SEPARATOR_HEIGHT SEPARATOR_HEIGHT
			 */
			SEPARATOR;

		}
	}
	
	public static enum Original {
		;
		public static enum BuildingMetric {
			NONE,
			NOS;
		}
	}
	
	public static enum Metaphor {
		RD, CITY
	}
}
