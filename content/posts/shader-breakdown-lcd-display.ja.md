+++ 
date = 2020-05-23T10:43:59+08:00
title = "Shader Breakdown - LCD Display"
description = "Breakdown of the LCD display shader."
slug = "" 
tags = ["Shader", "Unity", "Universal Render Pipeline"]
categories = []
externalLink = ""
series = []
+++

``` c
🏗️ 翻訳作業中。その前に、英語のバージョンを読んでください。
```

{{< figure src="/images/shader-breakdown-lcd-display/Shader-Breakdown-LCD-Display.png" >}}

This post is the breakdown of LCD display shader. Source code for Unity URP is provided.

> {{< fab github >}} Github \
> [Source Code](https://github.com/CJT-Jackton/URP-LCD-Dispaly-Example)

After reading this [shader tutorial](https://www.alanzucconi.com/2016/05/04/lcd-shader/) by Alan Zucconi, I decided to make my own version of LCD display shader. This effect itself is quiet simple, when viewing from distance, the LCD display act identical as a standard emissive material. But once you move close enough to the display, you can see the individual pixels of the LCD screen. What different from the original tutorial is, I use derivative in fragment shader to determine when to reveal the pixel structure of the display therefore the shader can adapt to all kinds of texture with different resolution.

So first off, we will need a texture that represents the actual pixel of display. A quick google search of "LCD pixel" will do the trick for you. Note that that is some displays that have none standard layout, like Pentile style display, but we won't get into these and only stick with the normal RGB pixel layout for the sake of simplicity of this tutorial.

We want to know the dimensions of the texture we using as the display content, and use it to scale the uv coordinate so that the pixel tile on each pixel of the texture. In Unity, you can call `TextureName_TexelSize` and Unity will automatically set up the right value for you.

``` hlsl
float2 pixelMaskUV = input.uv * _BaseMap_TexelSize.zw;
```

Then we simply multiply the LCD pixel texture and the color sampled from the display content texture. You might immediately notice that the display become dim. The reason why is we multiplied the color with the pixel texture, however each color channel only occupied less than 1/3 of the pixel grid, so we lost over 2/3 of the luminance. We can compensate the lost brightness by multiply a multiplier. You can find out the right value of your pixel texture in Photoshop's histogram view. Take my texture as example, the average value of red, green, blue is around 63 hence the multipier should be 255/63 = 4. 


### Pixelize Texture

```hlsl
half2 pixelMaskUV = uv * _BaseMap_TexelSize.zw;
half2 pixelizedUV = floor(pixelMaskUV) + half2(0.5, 0.5);
pixelizedUV /= _BaseMap_TexelSize.zw;
```

### Manually Compute Mipmap Level

First we need to know how texture lod level is calculated on the graphic side. The specification of OpenGL actually give us a clue of how this is done. In the chapter 3.9.11

\\[
\rho = max \\Bigg\\{ \sqrt{\\Big(\frac{\partial{u}}{\partial{x}}\\Big)^{2} + \\Big(\frac{\partial{v}}{\partial{x}}\\Big)^{2} + \\Big(\frac{\partial{w}}{\partial{x}}\\Big)^{2}}, \sqrt{\\Big(\frac{\partial{u}}{\partial{y}}\\Big)^{2} + \\Big(\frac{\partial{v}}{\partial{y}}\\Big)^{2} + \\Big(\frac{\partial{w}}{\partial{y}}\\Big)^{2}} \\Bigg\\}
\\]

\\[
\lambda(x, y) = \log_2{[\rho(x, y)]}
\\]

```hlsl
// The OpenGL Graphics System: A Specification 4.2
//  - chapter 3.9.11, equation 3.21
half2 pixelMaskTexcoord = pixelMaskUV * _PixelMask_TexelSize.zw;

half2 duvdx = ddx(pixelMaskTexcoord);
half2 duvdy = ddy(pixelMaskTexcoord);

half scaleFactor = max(dot(duvdx, duvdx), dot(duvdy, duvdy));
half mipmapLevel = 0.5 * log2(scaleFactor);
```


