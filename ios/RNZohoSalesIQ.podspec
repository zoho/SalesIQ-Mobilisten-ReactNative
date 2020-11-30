
Pod::Spec.new do |s|
  s.name          = "RNZohoSalesIQ"
  s.version       = "3.5.13"
  s.summary       = "Mobilisten React Native Wrapper"
  s.description   = "Mobilisten React Native Wrapper"
  s.homepage      = "https://zoho.com"
  s.license       = { :type => "MIT", :text=> <<-LICENSE
                          MIT License
                          Copyright (c) 2020 Zoho Corporation
                          Permission is hereby granted, free of charge, to any person obtaining a copy
                          of this software and associated documentation files (the "Software"), to deal
                          in the Software without restriction, including without limitation the rights
                          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                          copies of the Software, and to permit persons to whom the Software is
                          furnished to do so, subject to the following conditions:
                          The above copyright notice and this permission notice shall be included in all
                          copies or substantial portions of the Software.
                          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                          SOFTWARE
                          LICENSE
                  }
  s.author        = { "Rishabh Raghunath" => "rishabh.r@zohocorp.com" }
  s.platform      = :ios, "9.0"
  s.source        = { :git => "https://github.com/zoho/SalesIQ-Mobilisten-iOS", :tag => "v#{s.version}" }
  s.source_files  = "*.{h,m}"
  s.requires_arc  = true

  s.dependency "React"
  s.dependency "MobilistenBeta", "#{s.version}"

end
